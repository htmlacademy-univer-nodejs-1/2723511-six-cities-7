import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
};

export const createRestConfig = () => convict<RestSchema>({
  PORT: {
    doc: 'Порт, на котором приложение ожидает подключений',
    format: 'port',
    env: 'PORT',
    default: null,
  },
  SALT: {
    doc: 'Соль для хеширования паролей',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP-адрес сервера базы данных (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: null,
  },
});

export const REQUIRED_ENV_VARIABLES = ['PORT', 'SALT', 'DB_HOST'] as const;
