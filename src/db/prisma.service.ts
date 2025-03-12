import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage<PrismaClient>();

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  getClient(): PrismaClient {
    return asyncLocalStorage.getStore() ?? this;
  }

  async runInTransaction<T>(
    callback: (prisma: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    const transactionPrisma = new PrismaClient();
    return asyncLocalStorage.run(transactionPrisma, async () => {
      return await transactionPrisma.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return await callback(tx);
        },
      );
    });
  }
}
