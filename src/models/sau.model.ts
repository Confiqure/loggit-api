import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from './role.model';
import { SauRole } from './saurole.model';
import { School } from './school.model';
import { User } from './user.model';

@Table
export class Sau extends Model<Sau> {
  @Column({
    type: DataType.SMALLINT(3).UNSIGNED,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.TINYINT(1), allowNull: false })
  activity_types_enabled: boolean;

  @Column({ type: DataType.STRING(8), allowNull: false })
  credit_label: string;

  @Column({ type: DataType.TINYINT(1), allowNull: false })
  expenses_enabled: boolean;

  @Column({ type: DataType.TINYINT(1), allowNull: false })
  goal_enabled: boolean;

  @Column({ type: DataType.TEXT, allowNull: false })
  resources: string;

  @Column({ type: DataType.SMALLINT(4).UNSIGNED, allowNull: false })
  seat_limit: number;

  @Column({ type: DataType.STRING(32), allowNull: false })
  text_final: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  text_final_instructions: string;

  @Column({ type: DataType.STRING(32), allowNull: false })
  text_pre: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  text_pre_instructions: string;

  @Column({ type: DataType.TINYINT(1), allowNull: false })
  text_required: boolean;

  @Column({ type: DataType.TINYINT(1), allowNull: false })
  two_step_final_approval: boolean;

  @Column({ type: DataType.TEXT, allowNull: false })
  whitelist_emails: string;

  @BelongsToMany(() => Role, () => SauRole)
  roles: Role[];

  @HasMany(() => School)
  schools: School[];

  @HasMany(() => User)
  users: User[];
}
