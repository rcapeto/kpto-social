import { compare, hash } from 'bcrypt';

export interface EncryptPasswordParams {
  password: string;
  buffer?: number;
}

export interface CheckPasswordParams {
  password: string;
  encryptedPassword: string;
}

export async function encryptPassword(params: EncryptPasswordParams) {
  const { password, buffer } = Object.assign({ buffer: 10 }, params);
  return await hash(password, buffer);
}

export async function checkPassword(params: CheckPasswordParams) {
  const { encryptedPassword, password } = params;
  return await compare(password, encryptedPassword);
}
