import { resolver } from 'graphql-sequelize';
import { ActivityLink } from '../../models';

export const Query = {
  getActivityLink: resolver(ActivityLink),
};
