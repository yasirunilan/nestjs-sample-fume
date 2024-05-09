import { Global, Module } from '@nestjs/common';
import { Prisma } from './prisma.service';

@Global()
@Module({
  exports: [Prisma],
  providers: [Prisma],
})
export class DatabaseModule {}
