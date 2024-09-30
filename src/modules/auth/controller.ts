import { getAdminUserByUsername } from './service';
import { NextFunction, Request, Response } from 'express';
import { adminUserSchema, TAdminUser } from './schema';
import { sendSuccessNoDataResponse, sendSuccessResponse, sendUnauthorizedResponse } from '../../utils/responseHandler';
import { comparePasswords } from '../..//utils/bcryptHandler';
import { generateToken } from "../../utils/jwtHandler"

export const login = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const adminRequest: TAdminUser = request.body;
    const adminUser = await getAdminUserByUsername(adminRequest.username);

    if (!adminUser) {
      return sendUnauthorizedResponse(response, 'Credentials Error');
    }

    const passwordCompare = await comparePasswords(adminRequest.password, adminUser.password);

    if (passwordCompare) {
      const token = generateToken({ id: adminUser.id }, '30d');

      response.cookie('jwt', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      const responseData = {
        username: adminUser.username,
      };
      return sendSuccessResponse(response, responseData);
    } else {
      return sendUnauthorizedResponse(response, 'Credentials Error');
    }
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    response.cookie('jwt', '', {
      expires: new Date(0),
    });

    return sendSuccessNoDataResponse(response, 'Logout Successful');
  } catch (error) {
    next(error);
  }
};

export const validateLoginData = (request: Request, _response: Response, next: NextFunction) => {
  try {
    const data = request.body;
    adminUserSchema.parse(data);
    next();
  } catch (error) {
    next(error);
  }
};