import { NextFunction, Request, Response } from 'express';
import { sendSuccessResponse } from '../../utils/responseHandler';

import {
  getCep,

} from "./service";

export async function getCepHandler(req: Request, res: Response, next: NextFunction) {
  try{
    const cep = await getCep(req.params.cep.replaceAll(/\D/g, ''));
    return sendSuccessResponse(res, cep);
  }
  catch(e){
    next(e)
  }

}

