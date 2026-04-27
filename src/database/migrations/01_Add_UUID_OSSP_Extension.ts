import { type Kysely, sql } from 'kysely';

const extensionName = 'uuid-ossp';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`create extension if not exists ${sql.table(extensionName)}`.execute(
    db,
  );
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`drop extension if exists ${sql.table(extensionName)}`.execute(db);
}
