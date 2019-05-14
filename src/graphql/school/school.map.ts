import { resolver } from 'graphql-sequelize';
import { School } from '../../models';

export const SchoolMap = {
  sau: resolver(School.associations!.sau),
  users: resolver(School.associations!.users),
};
