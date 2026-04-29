import { Injectable, Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Tables } from "../database-models.types"
import { Card, CardCreate, CardUpdate } from './card.model';
import { CursorPaginationParamsDto } from '../../../common/pagination/dto/cursor-pagination-params.dto';
import { PaginationService } from '../../../common/pagination/pagination.service';

@Injectable()
export class CardsRepository {
  constructor(
    @Inject('DB') private readonly db: Kysely<Tables>,
    private readonly paginationService: PaginationService,
  ) {}

  async findById(id: string): Promise<Card | undefined> {
    return await this.db
      .selectFrom('cards')
      .innerJoin('columns', 'columns.id', 'cards.column_id')
      .selectAll('cards')
      .where('cards.id', '=', id)
      .where('cards.deleted_at', 'is', null)
      .where('columns.deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async getPaginatedCards(
    columnId: string,
    params: CursorPaginationParamsDto,
  ) {
    const queryBuilder = this.db
    .selectFrom('cards')
    .innerJoin('columns', 'columns.id', 'cards.column_id')
    .selectAll('cards')
    .where('cards.column_id', '=', columnId)
    .where('cards.deleted_at', 'is', null)
    .where('columns.deleted_at', 'is', null)
    .orderBy('cards.id', 'asc');

    return this.paginationService.paginate(queryBuilder, params, 'id');
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
