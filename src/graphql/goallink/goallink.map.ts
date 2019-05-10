import { resolver } from 'graphql-sequelize';
import { GoalLink } from '../../models';

export const GoalLinkMap = {
  parent: resolver(GoalLink.associations!.parent),
};
