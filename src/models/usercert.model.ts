import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Certification } from './certification.model';
import { User } from './user.model';

@Table
export class UserCert extends Model<UserCert> {
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(16), primaryKey: true, allowNull: false })
  username: string;

  @ForeignKey(() => Certification)
  @Column({
    type: DataType.STRING(6),
    primaryKey: true,
    allowNull: false,
  })
  cert_id: string;
}
