import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Activity } from './activity.model';
import { Goal } from './goal.model';

@Table
export class Credit extends Model<Credit> {
  @ForeignKey(() => Activity)
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
  })
  activity_id: number;

  @BelongsTo(() => Activity)
  activity: Activity;

  @ForeignKey(() => Goal)
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
  })
  goal_id: number;

  @BelongsTo(() => Goal)
  goal: Goal;

  @Column({
    type: DataType.DECIMAL(5, 2).UNSIGNED,
    allowNull: false,
  })
  amount: number;
}
