import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardModelModule } from '../database/models/cards/card.model.module';
import { ColumnModelModule } from '../database/models/columns/column.model.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';

@Module({
  imports: [
    CardModelModule,
    ColumnModelModule,
    JwtAuthModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
