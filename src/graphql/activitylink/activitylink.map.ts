import { resolver } from 'graphql-sequelize';
import { ActivityLink } from '../../models';

export const ActivityLinkMap = {
  parent: resolver(ActivityLink.associations!.parent),
};
