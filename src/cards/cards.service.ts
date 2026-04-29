import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CardsRepository } from '../database/models/cards/card.repository';
import { ColumnsRepository } from '../database/models/columns/column.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CursorPaginationParamsDto } from '../common/pagination/dto/cursor-pagination-params.dto';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardsRepo: CardsRepository,
    private readonly columnsRepo: ColumnsRepository,
  ) {}

  async create(columnId: string, dto: CreateCardDto) {
    const column = await this.columnsRepo.findById(columnId);
    if (!column) {
      throw new NotFoundException('колонка не найдена');
    }

    return this.cardsRepo.create({
      ...dto,
      column_id: columnId,
    });
  }

  async findAll(columnId: string, paginationDto: CursorPaginationParamsDto) {
    const column = await this.columnsRepo.findById(columnId);
    if (!column) {
      throw new NotFoundException('колонка не найдена');
    }
    return this.cardsRepo.getPaginatedCards(columnId, paginationDto);
  }

  async update(id: string, dto: UpdateCardDto) {
    const card = await this.cardsRepo.findById(id);
    if (!card) {
      throw new NotFoundException('карточка не найдена');
    }

    return this.cardsRepo.update(id, dto);
  }

  async remove(id: string) {
    const card = await this.cardsRepo.findById(id);
    if (!card) throw new NotFoundException('карточка не найдена');
    
    return this.cardsRepo.softDelete(id);
  }
}
