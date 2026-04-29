import { Module, Global } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { EncoderModule } from '../encoder/encoder.module';

@Global()
@Module({
  imports: [EncoderModule],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}
