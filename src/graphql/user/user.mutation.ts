import { resolver } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  createUser: resolver(User, {
    before: async (findOptions, { data }) => {
      let err, user;
      [err, user] = await to(Promise.resolve(User.create(data)));
      if (err) {
        throw err;
      }
      findOptions.where = { username: user.username };
      return findOptions;
    },
    after: user => {
      user.login = true;
      return user;
    },
  }),
};
