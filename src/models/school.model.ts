import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class School extends Model<School> {
  @Column({
    type: DataType.INTEGER(10).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING(64), allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  goal: string;

  @HasMany(() => User)
  users: User[];
}
