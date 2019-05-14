import { resolver } from 'graphql-sequelize';
import { Sau } from '../../models';

export const Query = {
  getSau: resolver(Sau),
};
