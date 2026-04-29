import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Выполнено' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  text!: string;
}
