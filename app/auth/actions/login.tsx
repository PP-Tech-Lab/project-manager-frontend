'use server';

import { authService } from '@/lib/api/services/auth.service';
import { LoginCredentials } from '@/lib/api/models/auth';
import { cookies } from 'next/headers';

export const login = async (credentials: LoginCredentials) => {
  try {
    console.log('Credentials: ', credentials);
    const { token } = await authService.login(credentials);

    console.log('Token: ', token);

    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/'
    });

    console.log("Token set in cookie")
    return { success: true };
  } catch (error) {
    console.log("Hubo pedo: ", error);
    console.error(error);
    return { success: false, message: 'Authentication failed' };
  }
};
