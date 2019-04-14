import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Activity } from './activity.model';

@Table
export class ActivityType extends Model<ActivityType> {
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING(128), unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.TINYINT(1), allowNull: false, defaultValue: 1 })
  preapproval_required: boolean;

  @HasMany(() => Activity)
  activities: Activity[];
}
