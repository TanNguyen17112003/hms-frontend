import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { UsersApi } from 'src/api/user';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { UserDetail } from 'src/types/user';
import { useAuth } from '@hooks';

interface ContextValue {
  getListUsersApi: UseFunctionReturnType<FormData, UserDetail[]>;
  deleteUser: (id: UserDetail['id']) => Promise<void>;
}

export const UserContext = createContext<ContextValue>({
  getListUsersApi: DEFAULT_FUNCTION_RETURN,
  deleteUser: async () => {}
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

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      getListUsersApi.call(new FormData());
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        getListUsersApi,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
