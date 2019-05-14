import { Query } from './sau.query';
import { SauMap } from './sau.map';
import { Mutation } from './sau.mutation';

export const resolver = {
  Query: Query,
  Sau: SauMap,
  Mutation: Mutation,
};
