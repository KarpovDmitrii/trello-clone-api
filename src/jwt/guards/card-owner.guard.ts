import { CanActivate, ExecutionContext, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ColumnsRepository } from '../../database/models/columns/column.repository';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(private readonly columnsRepo: ColumnsRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const columnId = request.params.columnId;

    const column = await this.columnsRepo.findById(columnId);
    if (!column || column.user_id !== userId) {
      throw new ForbiddenException('Вы не можете управлять карточками в этой колонке');
    }
    return true;
  }
}
