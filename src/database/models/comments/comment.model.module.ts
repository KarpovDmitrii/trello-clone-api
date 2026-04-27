import { Module } from '@nestjs/common';
import { CommentsRepository } from './comment.repository';

@Module({
  providers: [CommentsRepository],
  exports: [CommentsRepository],
})
export class CommentModelModule {}
