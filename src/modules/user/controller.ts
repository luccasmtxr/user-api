import { NextFunction, Request, Response } from 'express';
import { CreateUserSchema } from './schema';
import { sendSuccessNoDataResponse, sendSuccessResponse } from '../../utils/responseHandler';

import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from "./service";

export async function getUsersHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getUsers();
    return sendSuccessResponse(res, users);
  }
  catch (e) {
    next(e)
  }

}

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedUser = CreateUserSchema.parse(req.body)
    const user = await createUser(parsedUser);

    return sendSuccessResponse(res, user)
  }
  catch (e) {
    next(e)
  }
}

export async function getUserByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUserById(req.params.id);
    return sendSuccessResponse(res, user);
  }
  catch (e) {
    next(e)
  }
}

export async function updateUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await updateUser(req.params.id, req.body);
    return sendSuccessResponse(res, user)
  }
  catch (e) {
    next(e)
  }
}

export async function deleteUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteUser(req.params.id);
    return sendSuccessNoDataResponse(res, "User deletado com sucesso")
  }
  catch (e) {
    next(e)
  }
}