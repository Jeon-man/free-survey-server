import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeProvider } from './sequelize.provider';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigModule],
      useClass: SequelizeProvider,
    }),
  ],
})
export default class DatabaseModule {}
