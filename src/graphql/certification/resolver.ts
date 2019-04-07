import { Query } from './certification.query';
import { CertificationMap } from './certification.map';
import { Mutation } from './certification.mutation';

export const resolver = {
  Query: Query,
  Certification: CertificationMap,
  Mutation: Mutation,
};
