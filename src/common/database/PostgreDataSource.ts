import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './config';

export const AppDataSource = new DataSource(typeOrmConfig);
