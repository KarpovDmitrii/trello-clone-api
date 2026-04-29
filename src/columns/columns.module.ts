import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { ColumnModelModule } from '../database/models/columns/column.model.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';

@Module({
  imports: [
    ColumnModelModule, 
    JwtAuthModule,
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
