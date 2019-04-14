import { Query } from './expense.query';
import { ExpenseMap } from './expense.map';
import { Mutation } from './expense.mutation';

export const resolver = {
  Query: Query,
  Expense: ExpenseMap,
  Mutation: Mutation,
};
