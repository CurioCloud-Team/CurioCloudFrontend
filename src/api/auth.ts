import apiClient from './index';
import type { UserLogin, AuthResponse } from '../types/auth';
import type { AxiosResponse } from 'axios';

/**
 * 用户登录
 * @param credentials - 用户名和密码
 */
export const loginAPI = (credentials: UserLogin): Promise<AxiosResponse<AuthResponse>> => {
  return apiClient.post('/auth/login', credentials);
};
