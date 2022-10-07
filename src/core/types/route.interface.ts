import {HttpMethod} from './http-method.enum.js';
import {NextFunction, Request, Response} from 'express';
import {IMiddleware} from './middleware.interface.js';

export interface IRoute {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middleware?: IMiddleware[];
}
