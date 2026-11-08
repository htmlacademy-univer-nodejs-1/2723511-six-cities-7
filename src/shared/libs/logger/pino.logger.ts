import { format } from 'node:util';
import { injectable } from 'inversify';
import { Logger as PinoInstance, pino } from 'pino';
import { Logger } from './logger.interface.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    this.logger = pino();
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(format(message, ...args));
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(format(message, ...args));
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, format(message, ...args));
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(format(message, ...args));
  }
}
