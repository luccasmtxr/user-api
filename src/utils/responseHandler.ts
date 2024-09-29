import { Response } from 'express';

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse<T> {
  success: false;
  error: {
    message: T;
  };
}

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  status = 200
): Response<SuccessResponse<T>> => {
  return res.status(status).json({ success: true, data });
};

export const sendSuccessNoDataResponse = (
  res: Response,
  message = 'Operation successful',
  status = 2002
): Response<SuccessResponse<null>> => {
  return res.status(status).json({ success: true, message });
};

export const sendErrorResponse = <T>(
  res: Response,
  message: T,
  status = 500
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};


export const sendNotFoundResponse = <T>(
  res: Response,
  message: T,
  status = 404
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};


export const sendValidationError = <T>(
  res: Response,
  message: T,
  errors: string[],
  status = 400
): Response<ErrorResponse<T>> => {
  return res.status(status).json({
    success: false,
    error: {
      message: message,
      errors: errors,
    },
  });
};


export const sendUnauthorizedResponse = <T>(
  res: Response,
  message = 'Unauthorized',
  status = 401
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};


export const sendForbiddenResponse = <T>(
  res: Response,
  message = 'Forbidden',
  status = 403
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};


export const sendBadRequestResponse = <T>(
  res: Response,
  message: T,
  status = 400
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};