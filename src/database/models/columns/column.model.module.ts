import { Module } from '@nestjs/common';
import { ColumnsRepository } from './column.repository';
import { PaginationModule } from '../../../common/pagination/pagination.module'

@Module({
  imports: [PaginationModule], 
  providers: [ColumnsRepository],
  exports: [ColumnsRepository],
})
export class ColumnModelModule {}
