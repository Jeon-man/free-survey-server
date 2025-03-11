import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeProvider } from './sequelize.provider';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useExisting: SequelizeProvider,
    }),
  ],
  exports: [SequelizeModule],
})
export default class DatabaseModule {}
