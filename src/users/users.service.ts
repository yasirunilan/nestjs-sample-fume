import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: Prisma) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: { email: createUserDto.email, name: createUserDto.name },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      data: { name: updateUserDto.name },
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
