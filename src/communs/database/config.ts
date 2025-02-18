import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
} from '../config';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    entities: [__dirname + '/../../modules/**/*.entity.{js,ts}'],
    synchronize: true,
    logging: true,
};
