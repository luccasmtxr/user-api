import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { sendBadRequestResponse, sendErrorResponse, sendValidationError } from "../utils/responseHandler"

export const errorHandler = (error: any, _request: Request, response: Response, next: NextFunction) => {

  if (error instanceof z.ZodError) {
    const errors = error.errors.map((e: any) =>(
      {
        [`${e.path[0]}`]: e.message
      }
    )) as object[];

    return sendValidationError(response, 'Validation Error', errors);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const res =
      process.env.APP_ENV == 'developement'
        ? { error: 'Prisma Error occurred', details: error }
        : { error: 'Error occurred' };

    return sendBadRequestResponse(response, res);
  }


  const res = process.env.APP_ENV == 'developement' ? { message: error.message } : { message: 'Internal Server Error' };
  return sendErrorResponse(response, res);
};