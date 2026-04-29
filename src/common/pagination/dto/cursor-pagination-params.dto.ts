import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export abstract class CursorPaginationParamsDto {
  @ApiPropertyOptional({})
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @ApiPropertyOptional({
    required: false,
  })
  @IsOptional()
  @IsString()
  nextCursor?: string;
}
