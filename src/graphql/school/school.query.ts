import { resolver } from 'graphql-sequelize';
import { School } from '../../models';

export const Query = {
  getSchool: resolver(School),
};
