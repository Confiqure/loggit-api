import { resolver } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';

export const Query = {
  getUser: resolver(User, {
    before: async (findOptions: any, {}, { user }: { user: User }) => {
      findOptions.where = { username: user.username };
      return findOptions;
    },
    after: (user: User) => user,
  }),
  loginUser: resolver(User, {
    before: async (findOptions: any, { username }: { username: string }) => {
      findOptions.where = { username };
      return findOptions;
    },
    after: async (user: any, { password }: { password: string }) => {
      let err: any;
      [err, user] = await to(user.comparePassword(password));
      if (err) {
        throw new Error(err);
      }

      user.login = true; //to let the directive know to that this user is authenticated without an authorization header
      return user;
    },
  }),
};
