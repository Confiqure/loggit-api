import { resolver } from 'graphql-sequelize';
import { User } from '../../models';

export const UserMap = {
  certifications: resolver(User.associations.certifications),
  role: resolver(User.associations.role),
  school: resolver(User.associations.school),
  jwt: user => user.getJwt(),
};
