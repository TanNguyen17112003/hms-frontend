import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { UsersApi } from 'src/api/user';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { UserDetail } from 'src/types/user';
import { useAuth } from '@hooks';
import { UpdatePassworRequest, UpdatePasswordResponse, UpdateProfileRequest } from 'src/api/user';

interface ContextValue {
  getListUsersApi: UseFunctionReturnType<FormData, UserDetail[]>;
  deleteUser: (id: UserDetail['id']) => Promise<void>;
  changePassword: (request: UpdatePassworRequest) => Promise<UpdatePasswordResponse>;
}

export const UserContext = createContext<ContextValue>({
  getListUsersApi: DEFAULT_FUNCTION_RETURN,
  deleteUser: async () => {},
  changePassword: async (request: UpdatePassworRequest) => {
    return {} as UpdatePasswordResponse;
  }
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const getListUsersApi = useFunction(UsersApi.getUsers);

  const { user } = useAuth();
  const deleteUser = useCallback(
    async (id: UserDetail['id']) => {
      try {
        await UsersApi.deleteUser(id);
        getListUsersApi.setData((getListUsersApi.data || []).filter((user) => user.id !== id));
      } catch (err) {
        throw err;
      }
    },
    [getListUsersApi]
  );

  const changePassword = useCallback(async (request: UpdatePassworRequest) => {
    try {
      const response: UpdatePasswordResponse = await UsersApi.updatePassword(request);
      return response;
    } catch (err) {
      throw err;
    }
  }, []);

  // useEffect(() => {
  //   if (user?.role === 'ADMIN') {
  //     getListUsersApi.call(new FormData());
  //   }
  // }, [user]);

  return (
    <UserContext.Provider
      value={{
        getListUsersApi,
        deleteUser,
        changePassword
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
