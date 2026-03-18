import type { AuthToken } from '@/lib/api/models/auth';

export const authLoginAdapter =  (payload: unknown): AuthToken => {
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    const tokenLike = obj.accessToken;

    if (typeof tokenLike === 'string' && tokenLike.length > 0) {
      return { token: tokenLike };
    }
  }

  throw new Error('Invalid response format: token was not found in the response');
}
