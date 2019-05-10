import { resolver } from 'graphql-sequelize';
import { Credit } from '../../models';

export const CreditMap = {
  activity: resolver(Credit.associations!.activity),
  goal: resolver(Credit.associations!.goal),
};
