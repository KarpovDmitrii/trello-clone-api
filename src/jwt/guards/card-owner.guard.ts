import { CanActivate, ExecutionContext, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ColumnsRepository } from '../../database/models/columns/column.repository';
import { CardsRepository } from '../../database/models/cards/card.repository';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(
    private readonly columnsRepo: ColumnsRepository,
    private readonly cardsRepo: CardsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    
    const { columnId, id } = request.params;

    let targetColumnId = columnId;

    if (!targetColumnId && id) {
      const card = await this.cardsRepo.findById(id);
      if (!card) {
        throw new NotFoundException('Карточка не найдена');
      }
      targetColumnId = card.column_id;
    }

    if (!targetColumnId) {
      throw new ForbiddenException('Не удалось определить колонку');
    }

    const column = await this.columnsRepo.findById(targetColumnId);
    
    if (!column) {
      throw new NotFoundException('Колонка не найдена или удалена');
    }

    if (column.user_id !== userId) {
      throw new ForbiddenException('У вас нет прав на управление этой карточкой');
    }

    return true;
  }
}

