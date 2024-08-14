import { NextFunction, Request, Response } from "express";

// Format is 'key': enabled
const apiKeys: { [key: string]: boolean } = {
  "574c8880-3456-11ef-9a9c-0800200c9a66": true,
};

// Super basic API Key authentication middleware.
export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey: string | string[] | undefined = req.headers['x-api-key'];

  if (!apiKey || Array.isArray(apiKey) || !apiKeys[apiKey]) {
    res.status(403).send("Forbidden");
    return;
  }

  next();
};