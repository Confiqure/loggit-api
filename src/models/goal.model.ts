import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { Certification } from './certification.model';
import { User } from './user.model';

@Table
export class Goal extends Model<Goal> {
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(16), allowNull: false })
  username: string;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING(128), allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ForeignKey(() => Certification)
  @Column({ type: DataType.STRING(4), allowNull: false })
  type: string;

  @BelongsTo(() => Certification)
  certification: Certification;

  @Column({
    type: DataType.TINYINT(4).UNSIGNED,
    allowNull: false,
    defaultValue: 1,
  })
  state: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  comments: string;
}
