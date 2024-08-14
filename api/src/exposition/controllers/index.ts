import { Request, Response } from "express";

import AppError from "../../types/exceptions/AppError.exception";
import AppResult from "../../types/AppResult.type";
import Logger from "../../helpers/logger.helper";

export default async function handleControllerCall(req: Request, res: Response, logger: Logger, controllerFuncToCall: Function) {
  try {
    const result: AppResult = await controllerFuncToCall(req);

    res.status(result.statusCode).send(result.body);
  } catch (appError: any) {
    if (appError instanceof AppError) {
      res.status(appError.statusCode).send({
        message: appError.message,
        ...appError.data
      });
      return;
    }

    logger.error(appError);
    res.status(500).send({
      message: `An error ocurred`,
      error: appError
    });
  }
}