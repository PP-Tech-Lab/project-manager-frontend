import { http } from '@/lib/api/http/axios-client';
import { authLoginResponse } from '@/lib/api/adapters/auth.adapter';
import type { AuthToken, LoginCredentials } from '@/lib/api/models/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthToken> => {
    console.log("Sending request")
    const { data } = await http.post('/auth/login', credentials);
    console.log("Response: ", data)
    return authLoginResponse(data);
  }
};
