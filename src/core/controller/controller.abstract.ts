import {IController} from './controller.interface.js';
import {IRoute} from '../types/route.interface.js';
import {Response, Router} from 'express';
import {ILogger} from '../logger/logger.interface.js';

export default abstract class Controller implements IController {
  private _router!: Router;

  constructor(protected readonly logger: ILogger) {
    this._router = Router();
  }

  public addRoute(route: IRoute): void {
    const routeHandler = route.handler.bind(this);
    const middlewares = route.middleware?.map(
      (middleware) => middleware.execute.bind(middleware)
    );

    const handlers = middlewares ? [...middlewares, routeHandler] : routeHandler;

    this._router[route.method](route.path, handlers);
    this.logger.info(`Add new route: ${route.method.toUpperCase()} ${route.path}`);
  }

  get router() {
    return this._router;
  }

  protected send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, 201, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, 200, data);
  }
}
