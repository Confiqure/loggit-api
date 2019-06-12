import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { ActivityLink } from './activitylink.model';
import { ActivityType } from './activitytype.model';
import { Credit } from './credit.model';
import { Expense } from './expense.model';
import { User } from './user.model';

@Table
export class Activity extends Model<Activity> {
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER(11).UNSIGNED, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.SMALLINT(4).UNSIGNED, allowNull: false })
  year: number;

  @Column({ type: DataType.STRING(256), allowNull: false })
  name: string;

  @ForeignKey(() => ActivityType)
  @Column({ type: DataType.INTEGER(11), allowNull: false })
  type_id: number;

  @BelongsTo(() => ActivityType)
  type: ActivityType;

  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;

  @Column({ type: DataType.STRING(128), allowNull: false })
  location: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  text_pre: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  text_final: string;

  @Column({
    type: DataType.TINYINT(4).UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  })
  state: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  comments: string;

  @HasMany(() => Credit)
  credits: Credit[];

  @HasMany(() => Expense)
  expenses: Expense[];

  @HasMany(() => ActivityLink)
  links: ActivityLink[];
}
