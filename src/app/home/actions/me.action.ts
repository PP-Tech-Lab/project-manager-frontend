'use server';

import { authService } from '@/lib/api/services/auth.service';

export const meAction = async () => {
  try {
    const user = await authService.me();
    return user;
  } catch (error) {
    return null;
  }
};
