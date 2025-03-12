import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  UUIDV4,
} from 'sequelize';
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
  @Column({ type: DataType.UUID, defaultValue: UUIDV4 })
  id: string;

  @AllowNull(false)
  @Column
  title: string;

  @Column
  description?: string;
}
