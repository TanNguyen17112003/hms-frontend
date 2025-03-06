import { createContext, FC, ReactNode, useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Issuer } from 'src/utils/auth';
import CookieHelper, { CookieKeys } from 'src/utils/cookie-helper';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { initialUser, UserDetail } from 'src/types/user';

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
    user: initialUser
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
  signIn: (email: string, password: string) => Promise<string | undefined>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  issuer: Issuer.JWT,
  signIn: () => Promise.resolve(undefined),
  signOut: () => Promise.resolve(),
  refreshToken: () => Promise.resolve()
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

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
          if (!user || !user.id || !user.role || !user.name) {
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

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<string | undefined> => {
      // Implement your sign-in logic here
      return undefined;
    },
    [dispatch, CookieHelper]
  );

  const signOut = useCallback(async (): Promise<void> => {}, [router, dispatch]);

  const refreshToken = useCallback(async (): Promise<void> => {}, [signOut, CookieHelper]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.JWT,
        signIn,
        signOut,
        refreshToken
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
