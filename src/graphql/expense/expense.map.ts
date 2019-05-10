import { resolver } from 'graphql-sequelize';
import { Expense } from '../../models';

export const ExpenseMap = {
  activity: resolver(Expense.associations!.activity),
};
