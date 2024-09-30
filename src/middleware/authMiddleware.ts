import { getAdminUserById } from '../modules/auth/service';
import { NextFunction, Request, Response } from 'express';
import { sendUnauthorizedResponse } from '../utils/responseHandler';
import { verifyToken } from '../utils/jwtHandler';


const protectAuth = async (request: Request, response: Response, next: NextFunction) => {
  const allCookies = request.cookies;
  const token = allCookies.jwt;
  if (token) {
    try {
      const decoded = verifyToken(token);
      const authUser = await getAdminUserById(decoded.id);
      if (authUser?.username) {
        request.user = authUser;
      }
      next();
    } catch (error: any) {
      next(error);
    }
  } else {
    return sendUnauthorizedResponse(response, 'Faca login antes');
  }
};

export { protectAuth };