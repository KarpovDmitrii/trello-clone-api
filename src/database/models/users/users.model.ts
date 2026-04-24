import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export type UserModel = {
  id: Generated<string>;
  email: string;
  password_hash: string;
  created_at: Generated<Date>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
  deleted_at: ColumnType<Date | null, never, Date | null>;
};

export type User = Selectable<UserModel>;
export type UserCreate = Insertable<UserModel>;
export type UserUpdate = Updateable<UserModel>;
