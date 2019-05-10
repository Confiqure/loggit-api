import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Activity } from './activity.model';

@Table
export class ActivityLink extends Model<ActivityLink> {
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING(128), allowNull: false })
  name: string;

  @ForeignKey(() => Activity)
  @Column({ type: DataType.INTEGER(11).UNSIGNED, allowNull: false })
  parent_id: number;

  @BelongsTo(() => Activity)
  parent: Activity;

  @Column({ type: DataType.TEXT, allowNull: false })
  location: string;
}
