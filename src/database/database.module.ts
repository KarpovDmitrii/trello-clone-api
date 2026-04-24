import { Global, Module, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { Kysely, PostgresDialect, sql } from 'kysely';
import { Tables } from './models/database.types';

@Global()
@Module({
  providers: [
    {
      provide: 'DB',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('Database');

        const dialect = new PostgresDialect({
          pool: new Pool({
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            user: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_DATABASE'),
          }),
        });

        const db = new Kysely<Tables>({ dialect });

        try {
          await sql`SELECT 1`.execute(db);
          logger.log('Successfully сonnection to database');
        } catch {
          logger.error('Failed to connect to database');
        }

        return db;
      },
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
