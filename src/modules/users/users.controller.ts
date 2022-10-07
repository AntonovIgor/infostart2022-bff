import Controller from '../../core/controller/controller.abstract.js';
import {ILogger} from '../../core/logger/logger.interface.js';
import {HttpMethod} from '../../core/types/http-method.enum.js';
import {Request, Response} from 'express';
import CreateUserDto from './create-user.dto.js';
import got from 'got';
import {USER_ENDPOINT} from './user.const.js';

export default class UsersController extends Controller {
  constructor(protected logger: ILogger) {
    super(logger);

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create
    });
  }

  public async index(_req: Request, res: Response) {
    const users = await got
      .get(`${USER_ENDPOINT}/users`)
      .json<{email: string, password: string}[]>();

    this.ok(res, users);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response
  ) {
    this.created(res, {
      ...body
    })
  }
}
