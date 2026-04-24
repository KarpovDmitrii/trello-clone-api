import { Injectable, Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Tables } from "../database-models.types"
import { Comment, CommentCreate, CommentUpdate } from './comment.model';

@Injectable()
export class CommentsRepository {
  constructor(
    @Inject('DB') private readonly db: Kysely<Tables>,
  ) {}

  async findById(id: string): Promise<Comment | undefined> {
    return await this.db
      .selectFrom('comments')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  // Получить все комментарии к конкретной карточке
  async findByCardId(cardId: string): Promise<Comment[]> {
    return await this.db
      .selectFrom('comments')
      .selectAll()
      .where('card_id', '=', cardId)
      .where('deleted_at', 'is', null)
      .execute();
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
