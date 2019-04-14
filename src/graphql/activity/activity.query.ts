import { resolver } from 'graphql-sequelize';
import { Activity } from '../../models';

export const Query = {
  getActivity: resolver(Activity),
};
