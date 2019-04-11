import { resolver } from 'graphql-sequelize';
import { Goal } from '../../models';

export const Query = {
  getGoal: resolver(Goal),
};
