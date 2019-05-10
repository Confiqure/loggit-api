import { resolver } from 'graphql-sequelize';
import { Activity } from '../../models';

export const ActivityMap = {
  credits: resolver(Activity.associations!.credits),
  expenses: resolver(Activity.associations!.expenses),
  type: resolver(Activity.associations!.type),
  user: resolver(Activity.associations!.user),
};
