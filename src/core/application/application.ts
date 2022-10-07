import express, {Express, Request, Response} from 'express';
import {DEFAULT_PORT} from './application.const.js';
import {ILogger} from '../logger/logger.interface.js';

export class Application {
  private _expressApplication: Express;
  private _logger: ILogger;

  constructor(logger: ILogger) {
    this._expressApplication = express();
    this._logger = logger;
  }

  public initMiddleware() {
    this._expressApplication.use(express.json());
  }

  public initRoutes() {

    this._expressApplication.get('/users', (_req: Request, res: Response) => {
      res
        .status(200)
        .json({message: 'Hello Infostart'});
      });

    this._expressApplication.post('/users', (req: Request, res: Response) => {
      res
        .status(201)
        .json({
          message: 'user created',
          data: req.body
        });
    });
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
