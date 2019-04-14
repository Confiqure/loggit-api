import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Activity } from './activity.model';

@Table
export class Expense extends Model<Expense> {
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Activity)
  @Column({ type: DataType.INTEGER(11).UNSIGNED, allowNull: false })
  activity_id: string;

  @BelongsTo(() => Activity)
  activity: Activity;

  @Column({ type: DataType.TEXT, allowNull: false })
  name: string;

  @Column({ type: DataType.DECIMAL(5, 2).UNSIGNED, allowNull: false })
  amount: Date;

  @Column({ type: DataType.TEXT, allowNull: false })
  attachment_name: string;

  @Column({ type: DataType.STRING(37), allowNull: false })
  attachment_location: string;

  @Column({
    type: DataType.TINYINT(4).UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  })
  state: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  comments: string;
}
