import { UserModel } from './users/users.model';
import { ColumnModel } from './columns/column.model';
import { CardModel } from './cards/card.model'
import { CommentModel } from './comments/comment.model';

export type Tables = {
  users: UserModel;
  columns: ColumnModel;
  cards: CardModel;
  comments: CommentModel;
};
