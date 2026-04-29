import { CanActivate, ExecutionContext, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ColumnsRepository } from '../../database/models/columns/column.repository';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(private readonly columnsRepo: ColumnsRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const columnId = request.params.id;

    const column = await this.columnsRepo.findById(columnId);
    if (!column) throw new NotFoundException('Колонка не найдена');

    if (column.user_id !== userId) {
      throw new ForbiddenException('Вы не владелец этой колонки');
    }

    return true;
  }
}
