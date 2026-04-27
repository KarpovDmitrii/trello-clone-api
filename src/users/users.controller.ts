import { Controller, Post, Body, Get, Param, Patch, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomJwtGuard } from '../jwt/guards/custom-jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  register(@Body() dto: CreateUserDto) {
    return this.usersService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Вход в систему' })
  login(@Body() dto: CreateUserDto) {
    return this.usersService.login(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(CustomJwtGuard)
  @ApiOperation({ summary: 'Получить профиль' })
  findOne(@CurrentUser() user: any) {
    return this.usersService.findOne(user.userId);
  }

  @Patch('me')
  @ApiBearerAuth()
  @UseGuards(CustomJwtGuard)
  @ApiOperation({ summary: 'Обновить профиль' })
  update(@CurrentUser() user: any, @Body() dto: UpdateUserDto) {
    return this.usersService.update(user.userId, dto);
  }
}

