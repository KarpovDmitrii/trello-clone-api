import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: 'Сделать что-то' })
  @IsString()
  @MinLength(1)
  title!: string;

  @ApiPropertyOptional({ example: 'Завтра' })
  @IsString()
  @IsOptional()
  description?: string;
}
