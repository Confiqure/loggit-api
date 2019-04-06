import { Query } from './school.query';
import { SchoolMap } from './school.map';
import { Mutation } from './school.mutation';

export const resolver = {
  Query: Query,
  School: SchoolMap,
  Mutation: Mutation,
};
