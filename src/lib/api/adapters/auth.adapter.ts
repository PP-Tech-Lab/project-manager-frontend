import type { AuthToken } from '@/lib/api/models/auth';
import { AdapterErrors } from '@/lib/api/enums/adapter-errors.enum';

export const authLoginAdapter = (payload: unknown): AuthToken => {
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    const tokenLike = obj.accessToken;

    if (typeof tokenLike === 'string' && tokenLike.length > 0) return { token: tokenLike };
  }

  throw new Error(AdapterErrors.DATA_MISMATCH);
};
