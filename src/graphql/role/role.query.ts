import { resolver } from 'graphql-sequelize';
import { Role } from '../../models';

export const Query = {
  getRole: resolver(Role),
};
