import { Request, Response } from 'express';

export abstract class BaseController {
  handler: (request: Request, response: Response) => any;
}
