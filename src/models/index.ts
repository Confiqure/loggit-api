import { Sequelize } from 'sequelize-typescript';
import { ENV } from '../config/env.config';

export const sequelize = new Sequelize({
  database: ENV.DB_NAME,
  host: ENV.DB_HOST,
  port: +ENV.DB_PORT,
  dialect: ENV.DB_DIALECT,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  logging: false,
  storage: ':memory:',
  modelPaths: [__dirname + '/*.model.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});
export { Activity } from './activity.model';
export { ActivityLink } from './activitylink.model';
export { ActivityType } from './activitytype.model';
export { Certification } from './certification.model';
export { Credit } from './credit.model';
export { Expense } from './expense.model';
export { Goal } from './goal.model';
export { GoalLink } from './goallink.model';
export { Role } from './role.model';
export { Sau } from './sau.model';
export { SauRole } from './saurole.model';
export { School } from './school.model';
export { User } from './user.model';
export { UserCert } from './usercert.model';
