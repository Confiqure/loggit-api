import { resolver } from 'graphql-sequelize';
import { User } from '../../models';

export const UserMap = {
  role: resolver(User.associations.role),
  school: resolver(User.associations.school),
  jwt: user => user.getJwt(),
};
