import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentModelModule } from '../database/models/comments/comment.model.module';
import { CardModelModule } from '../database/models/cards/card.model.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';

@Module({
  imports: [
    CommentModelModule,
    CardModelModule,
    JwtAuthModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
