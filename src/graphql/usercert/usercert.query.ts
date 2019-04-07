import { resolver } from 'graphql-sequelize';
import { UserCert } from '../../models';

export const Query = {
  getUserCert: resolver(UserCert),
};
