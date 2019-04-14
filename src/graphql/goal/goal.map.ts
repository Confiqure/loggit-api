import { resolver } from 'graphql-sequelize';
import { Goal } from '../../models';

export const GoalMap = {
  certification: resolver(Goal.associations.certification),
  credits: resolver(Goal.associations.credits),
  user: resolver(Goal.associations.user),
};
