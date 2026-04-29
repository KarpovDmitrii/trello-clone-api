import { CanActivate, ExecutionContext, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from '../../database/models/comments/comment.repository';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(private readonly commentsRepo: CommentsRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const commentId = request.params.id;

    const comment = await this.commentsRepo.findById(commentId);
    if (!comment) throw new NotFoundException('Комментарий не найден');

    if (comment.user_id !== userId) {
      throw new ForbiddenException('Это не ваш комментарий');
    }

    return true;
  }
}
