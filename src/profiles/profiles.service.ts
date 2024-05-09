import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma } from '../database/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: Prisma) {}

  async create(createProfileDto: CreateProfileDto) {
    return await this.prisma.profile.create({
      data: { bio: createProfileDto.bio, userId: createProfileDto.userId },
    });
  }

  async findAll() {
    return await this.prisma.profile.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.profile.findUnique({ where: { id } });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.prisma.profile.update({
      data: { bio: updateProfileDto.bio },
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.profile.delete({ where: { id } });
  }
}
