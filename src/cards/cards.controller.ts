import { Controller, Post, Get, Delete, Body, Param, UseGuards, Patch, ParseUUIDPipe, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CustomJwtGuard } from '../jwt/guards/custom-jwt.guard';
import { CardOwnerGuard } from '../jwt/guards/card-owner.guard';
import { CursorPaginationParamsDto } from '../common/pagination/dto/cursor-pagination-params.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Cards')
@ApiBearerAuth()
@UseGuards(CustomJwtGuard)
@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('columns/:columnId/cards')
  @UseGuards(CardOwnerGuard)
  @ApiOperation({ summary: 'Создать карточку' })
  create(
    @Param('columnId', new ParseUUIDPipe()) columnId: string,
    @Body() dto: CreateCardDto,
  ) {
    return this.cardsService.create(columnId, dto);
  }

  @Get('columns/:columnId/cards')
  @ApiOperation({ summary: 'Получить карточки колонки' })
  findAll(
    @Param('columnId', new ParseUUIDPipe()) columnId: string,
    @Query() paginationDto: CursorPaginationParamsDto,
  ) {
    return this.cardsService.findAll(columnId, paginationDto);
  }

  @Patch('cards/:id')
  @UseGuards(CardOwnerGuard)
  @ApiOperation({ summary: 'Обновить карточку' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateCardDto,
  ) {
    return this.cardsService.update(id, dto);
  }

  @Delete('cards/:id')
  @UseGuards(CardOwnerGuard)
  @ApiOperation({ summary: 'Удалить карточку' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.cardsService.remove(id);
  }
}
