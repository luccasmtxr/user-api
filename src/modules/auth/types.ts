import { Admin } from '@prisma/client';

export type TloginRead = Omit<Admin, 'createdAt' | 'updatedAt'>;
export type TloginRequest = Omit<Admin, 'createdAt' | 'updatedAt' | 'password'>;

