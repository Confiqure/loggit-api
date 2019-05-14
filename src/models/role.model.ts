import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Sau } from './sau.model';
import { SauRole } from './saurole.model';
import { User } from './user.model';

@Table
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING(32), allowNull: false })
  name: string;

  @BelongsToMany(() => Sau, () => SauRole)
  saus: Sau[];

  @HasMany(() => User)
  users: User[];
}
