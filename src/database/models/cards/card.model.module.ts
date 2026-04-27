import { Module } from '@nestjs/common';
import { CardsRepository } from './card.repository';

@Module({
  providers: [CardsRepository],
  exports: [CardsRepository],
})
export class CardModelModule {}
