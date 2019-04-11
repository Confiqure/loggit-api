import { resolver } from 'graphql-sequelize';
import { User } from '../../models';

export const UserMap = {
  certifications: resolver(User.associations.certifications),
  goals: resolver(User.associations.goals),
  role: resolver(User.associations.role),
  school: resolver(User.associations.school),
  jwt: user => user.getJwt(),
};
