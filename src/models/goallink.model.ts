import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Goal } from './goal.model';

@Table
export class GoalLink extends Model<GoalLink> {
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING(128), allowNull: false })
  name: string;

  @ForeignKey(() => Goal)
  @Column({ type: DataType.INTEGER(11).UNSIGNED, allowNull: false })
  parent_id: number;

  @BelongsTo(() => Goal)
  parent: Goal;

  @Column({ type: DataType.TEXT, allowNull: false })
  location: string;
}
