import { resolver } from 'graphql-sequelize';
import { Goal } from '../../models';

export const GoalMap = {
  certification: resolver(Goal.associations.certification),
  user: resolver(Goal.associations.user),
};
