import { resolver } from 'graphql-sequelize';
import { ActivityType } from '../../models';

export const ActivityTypeMap = {
  activities: resolver(ActivityType.associations!.activities),
};
