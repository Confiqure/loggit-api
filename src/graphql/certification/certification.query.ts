import { resolver } from 'graphql-sequelize';
import { Certification } from '../../models';

export const Query = {
  getCertification: resolver(Certification),
};
