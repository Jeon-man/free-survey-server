import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
@Table({
  tableName: 'Survey',
  modelName: 'Survey',
  timestamps: false,
})
export class Survey extends Model<
  InferAttributes<Survey>,
  InferCreationAttributes<Survey, { omit: 'id' }>
> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: uuidv4 })
  id: string;

  @AllowNull(false)
  @Column
  title: string;

  @Column
  description?: string;
}
