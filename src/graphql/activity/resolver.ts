import { Query } from './activity.query';
import { ActivityMap } from './activity.map';
import { Mutation } from './activity.mutation';

export const resolver = {
  Query: Query,
  Activity: ActivityMap,
  Mutation: Mutation,
};
