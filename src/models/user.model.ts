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
  UpdatedAt,
} from 'sequelize-typescript';
import { Certification } from './certification.model';
import { Goal } from './goal.model';
import { Role } from './role.model';
import { School } from './school.model';
import { UserCert } from './usercert.model';
import * as bcrypt from 'bcrypt';
import to from 'await-to-js';
import * as jsonwebtoken from 'jsonwebtoken';
import { ENV } from '../config';

@Table
export class User extends Model<User> {
  @Column({ type: DataType.STRING(16), primaryKey: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING(60), allowNull: false })
  password: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  id: string;

  @Column({ type: DataType.STRING(128), unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(16), allowNull: false })
  firstname: string;

  @Column({ type: DataType.STRING(32), allowNull: false })
  lastname: string;

  @ForeignKey(() => School)
  @Column({
    type: DataType.INTEGER(10).UNSIGNED,
    allowNull: false,
    defaultValue: 1,
  })
  school_id: number;

  @BelongsTo(() => School)
  school: School;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER(10).UNSIGNED,
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

  @BelongsToMany(() => Certification, () => UserCert)
  certifications: Certification[];

  @HasMany(() => Goal)
  goals: Goal[];

  jwt: string;
  login: boolean;

  @BeforeSave
  static async hashPassword(user: User) {
    let err;
    if (user.changed('password')) {
      let salt, hash;
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

  async comparePassword(pw) {
    let err, pass;
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
