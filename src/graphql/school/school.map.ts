import { resolver } from 'graphql-sequelize';
import { School } from '../../models';

export const SchoolMap = {
  users: resolver(School.associations.users),
};
