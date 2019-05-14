import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from './role.model';
import { Sau } from './sau.model';

@Table
export class SauRole extends Model<SauRole> {
  @ForeignKey(() => Sau)
  @Column({
    type: DataType.SMALLINT(3).UNSIGNED,
    primaryKey: true,
    allowNull: false,
  })
  sau_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER(11),
    primaryKey: true,
    allowNull: false,
  })
  role_id: string;
}
