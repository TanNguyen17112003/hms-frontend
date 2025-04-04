import type { User, UserDetail } from 'src/types/user';
import { apiDelete, apiGet, apiPatch, apiPost, apiPut, getFormData } from 'src/utils/api-request';
import CookieHelper, { CookieKeys } from 'src/utils/cookie-helper';

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
  userInfo: UserDetail;
  refreshToken: string;
};

export type SignUpRequest = {
  fullName: string;
  email: string;
  password: string;
  ssn: string;
  phoneNumber: string
}

export type SignUpResponse = SignUpRequest & {
  id: string;
  createdAt: string;
  lastLoginAt: string;
};


export type InitialSignUpRequest = {
  email: string;
};


export type UpdateProfileRequest = Partial<
  Pick<
    SignUpRequest,
    'fullName' | 'password' | 'ssn' | 'phoneNumber'
  >
>;

export class UsersApi {
  static async postUser(request: Omit<User, 'id'>): Promise<User> {
    return await apiPost('/users', request);
  }

  static async getUsers(request: {}): Promise<UserDetail[]> {
    const response = await apiGet('/users', getFormData(request));
    return response;
  }

  static async signIn(request: SignInRequest): Promise<SignInResponse> {
    return await apiPost('/api/v1/patients/auth/signin', request);
  }

  static async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return await apiPost('/api/v1/patients/auth/signup', request);
  }

  static async me(): Promise<Partial<UserDetail>> {
    return await apiGet('/users/profile');
  }

  static async updatePassword(payload: {
    currentPassword: string;
    newPassword: string;
  }): Promise<User> {
    return await apiPut('/users/password', payload);
  }

  static async updateProfile(payload: UpdateProfileRequest): Promise<User> {
    return await apiPatch('/users/profile', payload);
  }


  static async deleteUser(id: User['id']) {
    return await apiDelete(`/users/${id}`, {});
  }

  static async refreshToken(refreshToken: string): Promise<Partial<SignInResponse>> {
    return await apiPost('/auth/refresh', { refreshToken });
  }

  static async signOut(refreshToken: string): Promise<void> {
    return await apiPost('/auth/signout', { refreshToken });
  }
}
