import { Injectable, Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Tables } from "../../models/database.types"
import { User, UserCreate, UserUpdate } from './users.model';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('DB') private readonly db: Kysely<Tables>,
  ) {}

  async findById(id: string): Promise<User | undefined> {
    return await this.db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .where('deleted_at', 'is', null)
      .executeTakeFirst();
  }

  async create(data: UserCreate): Promise<User> {
    return await this.db
      .insertInto('users')
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(id: string, data: UserUpdate): Promise<User> {
    return await this.db
      .updateTable('users')
      .set({
        ...data,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable('users')
      .set({ deleted_at: new Date() })
      .where('id', '=', id)
      .execute();
  }
}
