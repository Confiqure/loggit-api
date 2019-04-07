import { resolver } from 'graphql-sequelize';
import { Certification } from '../../models';

export const CertificationMap = {
  users: resolver(Certification.associations.users),
};
