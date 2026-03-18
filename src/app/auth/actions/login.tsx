'use server';

import { authService } from '@/lib/api/services/auth.service';
import { LoginCredentials } from '@/lib/api/models/auth';
import { cookies } from 'next/headers';

export const login = async (credentials: LoginCredentials) => {
  const { token } = await authService.login(credentials);

  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/'
  });

  return { success: true };
};
