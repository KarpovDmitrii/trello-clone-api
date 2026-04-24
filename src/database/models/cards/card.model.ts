import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export type CardModel = {
  id: Generated<string>;
  title: string;
  description: string | null;
  column_id: string;
  created_at: Generated<Date>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
  deleted_at: ColumnType<Date | null, never, Date | null>;
};

export type Card = Selectable<CardModel>;
export type CardCreate = Insertable<CardModel>;
export type CardUpdate = Updateable<CardModel>;
