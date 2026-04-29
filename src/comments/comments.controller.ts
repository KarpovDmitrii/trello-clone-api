import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, ParseUUIDPipe, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CustomJwtGuard } from '../jwt/guards/custom-jwt.guard';
import { CommentOwnerGuard } from '../jwt/guards/comment-owner.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CursorPaginationParamsDto } from '../common/pagination/dto/cursor-pagination-params.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(CustomJwtGuard)
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('cards/:cardId/comments')
  @ApiOperation({ summary: 'Оставить комментарий к карточке' })
  create(
    @Param('cardId', new ParseUUIDPipe()) cardId: string,
    @CurrentUser() user: any,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(cardId, user.userId, dto);
  }

  @Get('cards/:cardId/comments')
  @ApiOperation({ summary: 'Получить все комментарии к карточке' })
  findAll(
    @Param('cardId', new ParseUUIDPipe()) cardId: string,
    @Query() paginationDto: CursorPaginationParamsDto,
  ) {
    return this.commentsService.findAll(cardId, paginationDto);
  }

  @Patch('comments/:id')
  @UseGuards(CommentOwnerGuard)
  @ApiOperation({ summary: 'Редактировать комментарий' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.update(id, dto);
  }

  @Delete('comments/:id')
  @UseGuards(CommentOwnerGuard)
  @ApiOperation({ summary: 'Удалить комментарий' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commentsService.remove(id);
  }
}
