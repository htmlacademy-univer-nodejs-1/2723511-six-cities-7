import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';
import { Config } from './config.interface.js';
import { createRestConfig, REQUIRED_ENV_VARIABLES, RestSchema } from './rest.schema.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: ReturnType<typeof createRestConfig>;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    config({ quiet: true });

    const missing = REQUIRED_ENV_VARIABLES.filter((name) => !process.env[name]);
    if (missing.length > 0) {
      throw new Error(
        `Не заданы переменные окружения: ${missing.join(', ')}. Создайте файл .env по образцу .env.example`,
      );
    }

    this.config = createRestConfig();
    this.config.validate({ allowed: 'strict' });
    this.logger.info('.env file loaded, configuration is ready');
  }

  public get<K extends keyof RestSchema>(key: K): RestSchema[K] {
    return this.config.getProperties()[key];
  }
}
