export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT, 10) || 5432;
export const DATABASE_USER = process.env.DATABASE_USER || 'postgres';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '12345678';
export const DATABASE_NAME = process.env.DATABASE_NAME || 'heimdall';

export const APP_PORT = parseInt(process.env.APP_PORT, 10) || 3000;
