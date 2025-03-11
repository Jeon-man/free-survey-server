import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';

@Injectable()
export class SequelizeProvider implements SequelizeOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createSequelizeOptions():
    | SequelizeModuleOptions
    | Promise<SequelizeModuleOptions> {
    const schema = this.config.get<string>('DB_SCHEMA');

    return {
      dialect: 'postgres',
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_PORT'),
      username: this.config.get<string>('DB_USERNAME'),
      password: this.config.get<string>('DB_PASSWORD'),
      database: this.config.get<string>('DB_DATABASE'),
      ...(schema ? { schema } : {}),

      models: [],

      logging: (sql, time) => {
        Logger.debug(
          sql.replace('Executed', `Executed [${time}ms]`),
          'DATABASE_LOG',
        );
      },

      timezone: '+09:00',
      dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
      },
      sync: {
        alter: true,
        force: false,
      },
    };
  }
}
