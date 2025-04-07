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
  phoneNumber: string;
};

export type SignUpResponse = SignUpRequest & {
  id: string;
  createdAt: string;
  lastLoginAt: string;
};

export type UpdateInfoRequest = {
  email: string;
  fullName: string;
  ssn: string;
  phoneNumber: string;
};

export type UpdatePassworRequest = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type UpdatePasswordResponse = {
  messsage: string;
};

export type UpdateProfileRequest = Partial<
  Pick<SignUpRequest, 'fullName' | 'email' | 'ssn' | 'phoneNumber'>
>;

export type UpdateProfileResponse = Partial<SignUpResponse>;

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
    return await apiGet('/api/v1/patients/account');
  }

  static async updatePassword(payload: UpdatePassworRequest): Promise<UpdatePasswordResponse> {
    return await apiPut('/api/v1/patients/account/password', payload);
  }

  static async updateProfile(payload: UpdateProfileRequest): Promise<User> {
    return await apiPut('/api/v1/patients/account', payload);
  }

  static async deleteUser(id: User['id']) {
    return await apiDelete(`/users/${id}`, {});
  }

  static async refreshToken(refreshToken: string): Promise<Partial<SignInResponse>> {
    return await apiPost('/auth/refresh', { refreshToken });
  }
}
