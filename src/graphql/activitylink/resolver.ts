import { Query } from './activitylink.query';
import { ActivityLinkMap } from './activitylink.map';
import { Mutation } from './activitylink.mutation';

export const resolver = {
  Query: Query,
  ActivityLink: ActivityLinkMap,
  Mutation: Mutation,
};
