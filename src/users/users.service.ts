import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../database/models/users/users.repository';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async register(dto: CreateUserDto) {
    const exists = await this.usersRepo.findByEmail(dto.email);
    if (exists) {
      throw new ConflictException('Incorrect data');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersRepo.create({
      email: dto.email,
      password_hash: hashedPassword,
    });

    return this.login(dto);
  }

  async login(dto: CreateUserDto) {
    const user = await this.usersRepo.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password_hash))) {
      throw new UnauthorizedException('Incorrect data');
    }

    const token = this.jwtAuthService.signPayload(
      { email: user.email },
      user.id,
      'user',
    );

    return {
      user: { id: user.id, email: user.email },
      access_token: token,
    };
  }

  async findOne(id: string) {
    const user = await this.usersRepo.findById(id);
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);

    const updateData: any = { ...dto };
    if (dto.password) {
      updateData.password_hash = await bcrypt.hash(dto.password, 10);
      delete updateData.password;
    }

    return this.usersRepo.update(id, updateData);
  }
}
