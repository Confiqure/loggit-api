import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
  BelongsTo,
  BelongsToMany,
  BeforeSave,
  DataType,
} from 'sequelize-typescript';
import { Activity } from './activity.model';
import { Certification } from './certification.model';
import { Goal } from './goal.model';
import { Role } from './role.model';
import { Sau } from './sau.model';
import { School } from './school.model';
import { UserCert } from './usercert.model';
import bcrypt from 'bcrypt';
import to from 'await-to-js';
import jsonwebtoken from 'jsonwebtoken';
import { ENV } from '../config';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING(16), unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING(60), allowNull: false })
  password: string;

  @ForeignKey(() => Sau)
  @Column({ type: DataType.SMALLINT(3).UNSIGNED, allowNull: false })
  sau_id: number;

  @BelongsTo(() => Sau)
  sau: Sau;

  @Column({ type: DataType.TEXT, allowNull: false })
  staff_id: string;

  @Column({ type: DataType.STRING(128), unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(16), allowNull: false })
  firstname: string;

  @Column({ type: DataType.STRING(32), allowNull: false })
  lastname: string;

  @ForeignKey(() => School)
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    allowNull: false,
    defaultValue: 1,
  })
  school_id: number;

  @BelongsTo(() => School)
  school: School;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER(11).UNSIGNED,
    allowNull: false,
    defaultValue: 2,
  })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;

  @Column({
    type: DataType.ENUM('1', '2', '3'),
    allowNull: false,
    defaultValue: 1,
  })
  progress: string;

  @Column({ type: DataType.SMALLINT(4).UNSIGNED, allowNull: false })
  year: number;

  @Column({ type: DataType.INTEGER(6).UNSIGNED, allowNull: false })
  verified: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: 1 })
  active: boolean;

  @Column({
    type: DataType.INTEGER(8).UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  })
  logins: number;

  @HasMany(() => Activity)
  activities: Activity[];

  @BelongsToMany(() => Certification, () => UserCert)
  certifications: Certification[];

  @HasMany(() => Goal)
  goals: Goal[];

  jwt: string;
  login: boolean;

  @BeforeSave
  static async hashPassword(user: User) {
    let err: string | null;
    if (user.changed('password')) {
      let salt: any, hash: any;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) {
        throw err;
      }

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) {
        throw err;
      }
      user.password = hash;
    }
  }

  async comparePassword(pw: string) {
    let err: string | null, pass: boolean | undefined;
    if (!this.password) {
      throw new Error('Does not have password');
    }

    [err, pass] = await to(bcrypt.compare(pw, this.password));
    if (err) {
      throw err;
    }

    if (!pass) {
      throw 'Invalid password';
    }

    return this;
  }

  getJwt() {
    return (
      'Bearer ' +
      jsonwebtoken.sign(
        {
          username: this.username,
        },
        ENV.JWT_ENCRYPTION,
        { expiresIn: ENV.JWT_EXPIRATION }
      )
    );
  }
}
