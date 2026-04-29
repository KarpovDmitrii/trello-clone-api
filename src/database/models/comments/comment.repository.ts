import { Injectable, Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Tables } from "../database-models.types"
import { Comment, CommentCreate, CommentUpdate } from './comment.model';
import { CursorPaginationParamsDto } from '../../../common/pagination/dto/cursor-pagination-params.dto';
import { PaginationService } from '../../../common/pagination/pagination.service';

@Injectable()
export class CommentsRepository {
  constructor(
    @Inject('DB') private readonly db: Kysely<Tables>,
    private readonly paginationService: PaginationService,
  ) {}

  async findById(id: string): Promise<Comment | undefined> {
    return await this.db
      .selectFrom('comments')
      .innerJoin('cards', 'cards.id', 'comments.card_id')
      .innerJoin('columns', 'columns.id', 'cards.column_id')
      .selectAll('comments')
      .where('comments.id', '=', id)
      .where('comments.deleted_at', 'is', null)
      .where('cards.deleted_at', 'is', null)
      .where('columns.deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async getPaginatedComments(
    cardId: string,
    params: CursorPaginationParamsDto,
  ) {
    const queryBuilder = this.db
      .selectFrom('comments')
      .innerJoin('cards', 'cards.id', 'comments.card_id')
      .innerJoin('columns', 'columns.id', 'cards.column_id')
      .selectAll('comments')
      .where('comments.card_id', '=', cardId)
      .where('comments.deleted_at', 'is', null)
      .where('cards.deleted_at', 'is', null)
      .where('columns.deleted_at', 'is', null)
      .orderBy('comments.id', 'asc');

    return this.paginationService.paginate(queryBuilder, params, 'id');
  }

  async create(data: CommentCreate): Promise<Comment> {
    return await this.db
      .insertInto('comments')
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(id: string, data: CommentUpdate): Promise<Comment> {
    return await this.db
      .updateTable('comments')
      .set({ ...data, updated_at: new Date() })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable('comments')
      .set({ deleted_at: new Date() })
      .where('id', '=', id)
      .execute();
  }
}
