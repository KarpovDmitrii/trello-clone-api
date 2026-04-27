import { Module } from '@nestjs/common';
import { ColumnsRepository } from './column.repository';

@Module({
  providers: [ColumnsRepository],
  exports: [ColumnsRepository],
})
export class ColumnModelModule {}
