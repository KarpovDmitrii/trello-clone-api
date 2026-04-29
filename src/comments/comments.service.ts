import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from '../database/models/comments/comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CursorPaginationParamsDto } from '../common/pagination/dto/cursor-pagination-params.dto';
import { CardsRepository } from '../database/models/cards/card.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepo: CommentsRepository,
    private readonly cardsRepo: CardsRepository
  ) {}

  async create(cardId: string, userId: string, dto: CreateCommentDto) {
    const card = await this.cardsRepo.findById(cardId);
    if (!card) {
        throw new NotFoundException('Карточка или колонка не найдены');
    }
    return this.commentsRepo.create({
      text: dto.text,
      card_id: cardId,
      user_id: userId,
    });
  }

  async findAll(cardId: string, paginationDto: CursorPaginationParamsDto) {
    const card = await this.cardsRepo.findById(cardId);
    if (!card) {
        throw new NotFoundException('Карточка или колонка не найдены');
    }
    return this.commentsRepo.getPaginatedComments(cardId, paginationDto);
  }

  async update(id: string, dto: CreateCommentDto) {
    return this.commentsRepo.update(id, dto);
  }

  async remove(id: string) {
    return this.commentsRepo.softDelete(id);
  }
}
