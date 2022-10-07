import pino, {Logger} from 'pino';
import {ILogger} from './logger.interface.js';

export default class PinoService implements ILogger {
  private _logger!: Logger;

  constructor() {
    this._logger = pino();
    this._logger.info('🚀 Logger initialized');
  }

  public error(message: string, ...args: unknown[]): void {
    this._logger.error(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this._logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this._logger.warn(message, ...args);
  }
}
