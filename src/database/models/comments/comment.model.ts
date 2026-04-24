import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export type CommentModel = {
  id: Generated<string>;
  text: string;
  card_id: string;
  user_id: string;
  created_at: Generated<Date>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
  deleted_at: ColumnType<Date | null, never, Date | null>;
};

export type Comment = Selectable<CommentModel>;
export type CommentCreate = Insertable<CommentModel>;
export type CommentUpdate = Updateable<CommentModel>;
