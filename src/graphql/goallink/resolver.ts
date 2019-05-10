import { Query } from './goallink.query';
import { GoalLinkMap } from './goallink.map';
import { Mutation } from './goallink.mutation';

export const resolver = {
  Query: Query,
  GoalLink: GoalLinkMap,
  Mutation: Mutation,
};
