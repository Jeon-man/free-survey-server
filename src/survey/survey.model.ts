import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Survey extends Model<
  InferAttributes<Survey>,
  InferCreationAttributes<Survey, { omit: 'id' }>
> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: () => crypto.randomUUID() })
  id: string;

  @AllowNull(false)
  @Column
  title: string;

  @Column
  description?: string;
}
