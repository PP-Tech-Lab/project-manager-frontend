import { http } from '@/lib/api/http/axios-client';
import { authLoginAdapter } from '@/lib/api/adapters/auth.adapter';
import type { AuthToken, LoginCredentials } from '@/lib/api/models/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthToken> => {
    const { data } = await http.post('/auth/login', credentials);
    return authLoginAdapter(data);
  }
};
