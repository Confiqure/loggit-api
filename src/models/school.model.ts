import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Sau } from './sau.model';
import { User } from './user.model';

@Table
export class School extends Model<School> {
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Sau)
  @Column({ type: DataType.SMALLINT(3).UNSIGNED, allowNull: false })
  sau_id: number;

  @BelongsTo(() => Sau)
  sau: Sau;

  @Column({ type: DataType.STRING(64), unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  goal: string;

  @HasMany(() => User)
  users: User[];
}
