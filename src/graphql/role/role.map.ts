import { resolver } from 'graphql-sequelize';
import { Role } from '../../models';

export const RoleMap = {
  saus: resolver(Role.associations!.saus),
  users: resolver(Role.associations!.users),
};
