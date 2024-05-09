import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '../database/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: Prisma) {}

  async create(createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        authorId: createPostDto.authorId,
      },
    });
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.post.delete({ where: { id } });
  }
}
