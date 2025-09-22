import apiClient from './index';
import type { UserLogin, UserCreate, AuthResponse, UserProfileResponse } from '../types/auth';
import type { AxiosResponse } from 'axios';

/**
 * 用户注册
 * @param userData - 用户注册信息
 */
export const registerAPI = (userData: UserCreate): Promise<AxiosResponse<AuthResponse>> => {
  return apiClient.post('/auth/register', userData);
};

/**
 * 用户登录
 * @param credentials - 用户名和密码
 */
export const loginAPI = (credentials: UserLogin): Promise<AxiosResponse<AuthResponse>> => {
  return apiClient.post('/auth/login', credentials);
};

/**
 * 获取用户资料
 */
export const getUserProfileAPI = (): Promise<AxiosResponse<UserProfileResponse>> => {
  return apiClient.get('/user/profile');
};
