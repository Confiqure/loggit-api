import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER(10).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING(32), allowNull: false })
  name: string;

  @HasMany(() => User)
  users: User[];
}
