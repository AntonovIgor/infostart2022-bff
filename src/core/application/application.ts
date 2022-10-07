import express, {Express} from 'express';
import {DEFAULT_PORT} from './application.const.js';
import {ILogger} from '../logger/logger.interface.js';
import Controller from '../controller/controller.abstract.js';

export class Application {
  private _expressApplication: Express;
  private _logger: ILogger;
  private _userController: Controller;

  constructor(logger: ILogger, userController: Controller) {
    this._expressApplication = express();
    this._logger = logger;
    this._userController = userController;
  }

  public initMiddleware() {
    this._expressApplication.use(express.json());
  }

  public initRoutes() {
    this._expressApplication.use('/users', this._userController.router);
  }

  public async init() {
    this.initMiddleware();
    this._logger.info('Middleware registered…');

    this.initRoutes();
    this._logger.info('🤖 Routes registered…');

    this._expressApplication.listen(DEFAULT_PORT);
    this._logger.info(`🌎 Server started on the ${DEFAULT_PORT}`);
  }
}
