import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 'В планах' })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  title!: string;
}
