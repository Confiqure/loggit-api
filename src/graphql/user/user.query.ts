import { resolver } from 'graphql-sequelize';
import { User } from '../../models';

export const Query = {
  getUser: resolver(User, {
    before: async (findOptions: any, {}, { user }: { user: User }) => {
      findOptions.where = { username: user.username };
      return findOptions;
    },
    after: (user: User) => user,
  }),
};
