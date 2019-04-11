import { Query } from './goal.query';
import { GoalMap } from './goal.map';
import { Mutation } from './goal.mutation';

export const resolver = {
  Query: Query,
  Goal: GoalMap,
  Mutation: Mutation,
};
