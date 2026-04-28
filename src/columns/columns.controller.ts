import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, ParseUUIDPipe, ForbiddenException, Query } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { CustomJwtGuard } from '../jwt/guards/custom-jwt.guard';
import { ColumnOwnerGuard } from '../jwt/guards/column-owner.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CursorPaginationParamsDto } from '../common/pagination/dto/cursor-pagination-params.dto';

@ApiTags('Columns')
@ApiBearerAuth()
@UseGuards(CustomJwtGuard)
@Controller()
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post('users/:userId/columns')
  @ApiOperation({ summary: 'Создать колонку' })
  create(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @CurrentUser() user: any,
    @Body() dto: CreateColumnDto,
  ) {
    if (user.userId !== userId) throw new ForbiddenException('Access denied');
    return this.columnsService.create(userId, dto);
  }

  @Get('users/:userId/columns')
  @ApiOperation({ summary: 'Получить все колонки пользователя' })
  findAll(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Query() paginationDto: CursorPaginationParamsDto,
    ) {
    return this.columnsService.findAll(userId, paginationDto);
    }

  @Patch('columns/:id')
  @UseGuards(ColumnOwnerGuard)
  @ApiOperation({ summary: 'Обновить колонку' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateColumnDto,
  ) {
    return this.columnsService.update(id, dto);
  }

  @Delete('columns/:id')
  @UseGuards(ColumnOwnerGuard)
  @ApiOperation({ summary: 'Удалить колонку' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.columnsService.remove(id);
  }
}
