import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from '../database/models/columns/column.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { CursorPaginationParamsDto } from '../common/pagination/dto/cursor-pagination-params.dto';
import { PaginationService } from '../common/pagination/pagination.service';

@Injectable()
export class ColumnsService {
  constructor(
    private readonly columnsRepo: ColumnsRepository,
    private readonly paginationService: PaginationService,
  ) {}

  async create(userId: string, dto: CreateColumnDto) {
    return this.columnsRepo.create({
      title: dto.title,
      user_id: userId,
    });
  }

  async findAll(userId: string, paginationDto: CursorPaginationParamsDto) {
    return this.columnsRepo.getPaginatedColumns(userId, paginationDto);
  }

  async update(id: string, dto: CreateColumnDto) {
    return this.columnsRepo.update(id, { title: dto.title });
  }

  async remove(id: string) {
    return this.columnsRepo.softDelete(id);
  }
}
