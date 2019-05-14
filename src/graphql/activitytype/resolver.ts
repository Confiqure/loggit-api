import { Query } from './activitytype.query';
import { ActivityTypeMap } from './activitytype.map';
import { Mutation } from './activitytype.mutation';

export const resolver = {
  Query: Query,
  ActivityType: ActivityTypeMap,
  Mutation: Mutation,
};
