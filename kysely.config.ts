import { defineConfig } from 'kysely-ctl';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    }),
  }) as any, 
  migrations: {
    migrationFolder: 'src/database/migrations',
  },
  seeds: {
    seedFolder: 'src/database/seeds',
  },
});
