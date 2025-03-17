import { createHash } from 'crypto';

export const hashPassword = (password: string) =>
  createHash('sha256').update(password).digest('hex');

export const comparePassword = (password: string, hash: string) => {
  return createHash('sha256').update(password).digest('hex') === hash;
};
