import { useContext } from 'react';

import type { AuthContextType as JwtAuthContextType } from 'src/contexts/auth/jwt-context';
import { AuthContext as JwtAuthContext } from 'src/contexts/auth/jwt-context';

type AuthContextType = JwtAuthContextType;

export const useAuth = <T = AuthContextType>() => useContext(JwtAuthContext) as T;

