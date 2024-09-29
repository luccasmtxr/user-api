import { NextFunction, Request, Response } from 'express';
import { UserSchema } from './schema';
import { sendNotFoundResponse, sendSuccessNoDataResponse, sendSuccessResponse } from '../../utils/responseHandler';

import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from "./service";

export async function getUsersHandler(req: Request, res: Response, next: NextFunction) {
  try{
    const users = await getUsers();
    return res.status(200).send(users);
  }
  catch(e){

  }

}

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  try{
    const userData = req.body
    UserSchema.parse(userData)
    const user = await createUser(userData);
    return sendSuccessResponse(res, user)
  }
  catch(e){
    next(e)
  }
}

export async function getUserByIdHandler(req: Request, res: Response, next: NextFunction) {
  try{
    const user = await getUserById(req.params.id);
    return res.status(200).send(user);
  }
  catch(e){
    
  }
}

export async function updateUserHandler(req: Request, res: Response, next: NextFunction) {
  try{
    const user = await updateUser(req.params.id, req.body);
    return res.status(200).send(user);
  }
  catch(e){
    
  }
}

export async function deleteUserHandler(req: Request, res: Response, next: NextFunction) {
  try{
    await deleteUser(req.params.id);
    return res.status(204).send();
  }
  catch(e){
    
  }
}