import { TloginRequest } from '../src/modules/auth/types';

declare module 'express' {
  interface Request {
    user?: TloginRequest;
  }
}