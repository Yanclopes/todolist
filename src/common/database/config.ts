import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} from '../config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: [__dirname + '/../../modules/**/*.entity.{js,ts}'],
  synchronize: false,
  logging: true,
  migrations: [__dirname + '/../../modules/migrations/*{.ts,.js}'],
};
