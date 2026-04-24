import { Module } from '@nestjs/common';
import { UsersModelModule } from './users/users.model.module';
import { ColumnModelModule } from './columns/column.model.module';
import { CardModelModule } from './cards/card.model.module';
import { CommentModelModule } from './comments/comment.model.module';

@Module({
  imports: [
    UsersModelModule,
    ColumnModelModule,
    CardModelModule,
    CommentModelModule,
  ],
  exports: [
    UsersModelModule,
    ColumnModelModule,
    CardModelModule,
    CommentModelModule,
  ],
})
export class ModelsModule {}
