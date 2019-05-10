import { resolver } from 'graphql-sequelize';
import { GoalLink } from '../../models';

export const Query = {
  getGoalLink: resolver(GoalLink),
};
