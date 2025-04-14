import { createContext, FC, ReactNode, useCallback, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { Issuer } from 'src/utils/auth';
import CookieHelper, { CookieKeys } from 'src/utils/cookie-helper';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { initialUser, UserDetail } from 'src/types/user';
import { UpdateProfileRequest, UpdateProfileResponse, UsersApi } from 'src/api/user';
import useAppSnackbar from 'src/hooks/use-app-snackbar';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: UserDetail | null;
}

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PROFILE = 'UPDATE_PROFILE'
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: UserDetail | null;
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    user: UserDetail;
  };
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: {
    user: UserDetail;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type UpdateProfileAction = {
  type: ActionType.UPDATE_PROFILE;
  payload: {
    user: UserDetail;
  };
};

type Action = InitializeAction | SignInAction | SignUpAction | SignOutAction | UpdateProfileAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  SIGN_IN: (state: State, action: SignInAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  SIGN_UP: (state: State, action: SignUpAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  UPDATE_PROFILE: (state: State, action: UpdateProfileAction): State => ({
    ...state,
    user: action.payload.user
  })
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export interface AuthContextType extends State {
  issuer: Issuer.JWT;
  signIn: (email: string, password: string) => Promise<UserDetail | undefined>;
  signInAsStaff: (email: string, password: string) => Promise<UserDetail | undefined>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateProfile: (info: UpdateProfileRequest) => Promise<UpdateProfileResponse>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  issuer: Issuer.JWT,
  signIn: () => Promise.resolve(undefined),
  signInAsStaff: () => Promise.resolve(undefined),
  signOut: () => Promise.resolve(),
  refreshToken: () => Promise.resolve(),
  updateProfile: () => Promise.resolve({} as UpdateProfileResponse)
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastActionType, setLastActionType] = useState<ActionType | null>(null);
  const router = useRouter();
  const { showSnackbarError } = useAppSnackbar();

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const accessToken = CookieHelper.getItem(CookieKeys.TOKEN);
      const userData = CookieHelper.getItem('user_data');
      console.log('accessToken', accessToken);
      console.log('user_data', userData);

      if (accessToken && userData) {
        let user: UserDetail | undefined = undefined;
        try {
          user = JSON.parse(userData);
        } catch {}
        if (!user) {
          user = await JSON.parse(localStorage.getItem('user_data') || '{}');
          if (!user || !user.id || !user.role || !user.fullName) {
            throw new Error('Ger user failed.');
          }
        }
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user: user || null
          }
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  }, [dispatch]);

  const enhancedDispatch = (action: Action) => {
    setLastActionType(action.type);
    dispatch(action);
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<UserDetail> => {
      const response = await UsersApi.signIn({ email, password });
      const responseData = {
        id: response.userInfo.id,
        email: response.userInfo.email,
        fullName: response.userInfo.fullName,
        phoneNumber: response.userInfo.phoneNumber,
        role: response.userInfo.role,
        ssn: response.userInfo.ssn,
        createdAt: response.userInfo.createdAt,
        lastLoginAt: response.userInfo.lastLoginAt
      };
      CookieHelper.setItem(CookieKeys.TOKEN, response.accessToken);
      CookieHelper.setItem('user_data', JSON.stringify(responseData));

      enhancedDispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user: responseData
        }
      });
      return responseData;
    },
    [dispatch]
  );
  const signInAsStaff = useCallback(
    async (email: string, password: string): Promise<UserDetail> => {
      const response = await UsersApi.signInAsStaff({ email, password });
      const responseData = {
        id: response.userInfo.id,
        email: response.userInfo.email,
        fullName: response.userInfo.fullName,
        phoneNumber: response.userInfo.phoneNumber,
        role: response.userInfo.role,
        ssn: response.userInfo.ssn,
        createdAt: response.userInfo.createdAt,
        lastLoginAt: response.userInfo.lastLoginAt
      };
      CookieHelper.setItem(CookieKeys.TOKEN, response.accessToken);
      CookieHelper.setItem('user_data', JSON.stringify(responseData));

      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user: responseData
        }
      });
      return responseData;
    },
    [dispatch]
  );
  const signOut = useCallback(async (): Promise<void> => {
    CookieHelper.removeItem(CookieKeys.TOKEN);
    dispatch({ type: ActionType.SIGN_OUT });
    router.push(paths.index);
  }, [router]);

  const refreshToken = useCallback(async (): Promise<void> => {}, [signOut, CookieHelper]);

  const updateProfile = useCallback(
    async (info: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
      const response = await UsersApi.updateProfile(info);
      const user = {
        ...state.user,
        ...response
      };
      CookieHelper.setItem('user_data', JSON.stringify(user));
      dispatch({
        type: ActionType.UPDATE_PROFILE,
        payload: {
          user
        }
      });
      return response;
    },
    [CookieHelper]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (lastActionType === ActionType.SIGN_IN && state.user?.id === undefined) {
      const forceSignOut = async () => {
        setTimeout(async () => {
          await signOut();
          await CookieHelper.removeItem('user_data');
          await setLastActionType(null);
          window.location.href = paths.landing.index;
        }, 1000);
        showSnackbarError('Your session has expired. Please sign in again.');
      };
      const timeout = setTimeout(() => {
        forceSignOut();
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [lastActionType, state.user?.id, signOut, showSnackbarError, setLastActionType]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.JWT,
        signIn,
        signInAsStaff,
        signOut,
        refreshToken,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
