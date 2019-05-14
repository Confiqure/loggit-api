import { resolver } from 'graphql-sequelize';
import { Sau } from '../../models';

export const SauMap = {
  roles: resolver(Sau.associations!.roles),
  schools: resolver(Sau.associations!.schools),
  users: resolver(Sau.associations!.users),
};
