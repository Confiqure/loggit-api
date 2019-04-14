import { Query } from './credit.query';
import { CreditMap } from './credit.map';
import { Mutation } from './credit.mutation';

export const resolver = {
  Query: Query,
  Credit: CreditMap,
  Mutation: Mutation,
};
