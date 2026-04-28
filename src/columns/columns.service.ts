import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from '../database/models/columns/column.repository';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnsService {
  constructor(private readonly columnsRepo: ColumnsRepository) {}

  async create(userId: string, dto: CreateColumnDto) {
    return this.columnsRepo.create({
      title: dto.title,
      user_id: userId,
    });
  }

  async findAll(userId: string) {
    return this.columnsRepo.findByUserId(userId);
  }

  async update(id: string, dto: CreateColumnDto) {
    return this.columnsRepo.update(id, { title: dto.title });
  }

  async remove(id: string) {
    return this.columnsRepo.softDelete(id);
  }
}
