import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export type ColumnModel = {
  id: Generated<string>;
  title: string;
  user_id: string;
  created_at: Generated<Date>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
  deleted_at: ColumnType<Date | null, never, Date | null>;
};

export type Column = Selectable<ColumnModel>;
export type ColumnCreate = Insertable<ColumnModel>;
export type ColumnUpdate = Updateable<ColumnModel>;
