import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from './user.model';
import { UserCert } from './usercert.model';

@Table
export class Certification extends Model<Certification> {
  @Column({
    type: DataType.STRING(4),
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({ type: DataType.STRING(64), unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  notes: string;

  @BelongsToMany(() => User, () => UserCert)
  users: User[];
}
