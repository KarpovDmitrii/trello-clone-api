import { Injectable, Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Tables } from "../database-models.types"
import { Card, CardCreate, CardUpdate } from './card.model';

@Injectable()
export class CardsRepository {
  constructor(
    @Inject('DB') private readonly db: Kysely<Tables>,
  ) {}

  async findById(id: string): Promise<Card | undefined> {
    return await this.db
      .selectFrom('cards')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async findByColumnId(columnId: string): Promise<Card[]> {
    return await this.db
      .selectFrom('cards')
      .selectAll()
      .where('column_id', '=', columnId)
      .where('deleted_at', 'is', null)
      .execute();
  }

  async create(data: CardCreate): Promise<Card> {
    return await this.db
      .insertInto('cards')
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(id: string, data: CardUpdate): Promise<Card> {
    return await this.db
      .updateTable('cards')
      .set({ ...data, updated_at: new Date() })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable('cards')
      .set({ deleted_at: new Date() })
      .where('id', '=', id)
      .execute();
  }
}
