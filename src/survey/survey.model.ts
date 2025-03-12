import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import {
  AllowNull,
  BeforeCreate,
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
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column
  title: string;

  @Column
  description?: string;

  @BeforeCreate
  generateId() {
    this.id = crypto.randomUUID();
  }
}
