import { Injectable, Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Tables } from "../database-models.types"
import { Column, ColumnCreate, ColumnUpdate } from './column.model';

@Injectable()
export class ColumnsRepository {
  constructor(
    @Inject('DB') private readonly db: Kysely<Tables>,
  ) {}

  async findByUserId(userId: string): Promise<Column[]> {
    return await this.db
      .selectFrom('columns')
      .selectAll()
      .where('user_id', '=', userId)
      .where('deleted_at', 'is', null)
      .execute();
  }

  async findById(id: string): Promise<Column | undefined> {
    return await this.db
      .selectFrom('columns')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async create(data: ColumnCreate): Promise<Column> {
    return await this.db
      .insertInto('columns')
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(id: string, data: ColumnUpdate): Promise<Column> {
    return await this.db
      .updateTable('columns')
      .set({ ...data, updated_at: new Date() })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable('columns')
      .set({ deleted_at: new Date() })
      .where('id', '=', id)
      .execute();
  }
}
