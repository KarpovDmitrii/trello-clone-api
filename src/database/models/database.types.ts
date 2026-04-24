import { UserModel } from './users/users.model';
import { ColumnModel } from './columns/column.model';

export type Tables = {
  users: UserModel;
  columns: ColumnModel;
};
