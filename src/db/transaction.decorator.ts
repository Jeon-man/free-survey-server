// transactional.decorator.ts
import { PrismaService } from './prisma.service';

export const Transactional = () => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const prismaService = new PrismaService();

      return await prismaService.runInTransaction(async (tx) => {
        return await originalMethod.apply(this, [tx, ...args]);
      });
    };
  } as MethodDecorator;
};
