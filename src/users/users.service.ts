import { Injectable, ConfigService } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '../database/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class UsersService {
  constructor(private prisma: Prisma, private configService: ConfigService) {
    const stripeApiKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeApiKey) {
      throw new Error('Stripe API key not configured.');
    }
    this.stripe = new Stripe(stripeApiKey, { apiVersion: '2020-08-27' });
  }

  async create(createUserDto: CreateUserDto) {
    const customer = await this.stripe.customers.create({
      email: createUserDto.email,
      name: createUserDto.name,
    });
    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        stripeCustomerId: customer.id,
      },
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
