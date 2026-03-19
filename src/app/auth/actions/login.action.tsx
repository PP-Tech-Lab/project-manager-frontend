'use server';

import { authService } from '@/lib/api/services/auth.service';
import { LoginCredentials } from '@/lib/api/models/auth';
import { cookies } from 'next/headers';
import { ApiErrors } from '@/lib/api/enums/api-errors.enum';

export const loginAction = async (credentials: LoginCredentials) => {
  try {
    const { token } = await authService.login(credentials);

    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/'
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: (error as ApiErrors) || ApiErrors.UNKNOWN
    };
  }
};
