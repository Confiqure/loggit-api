import { resolver } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  createUser: resolver(User, {
    before: async (findOptions: any, { data }: { data: any }) => {
      let err: User | null, user: any;
      [err, user] = await to(Promise.resolve(User.create(data)));
      if (err) {
        throw err;
      }
      findOptions.where = { email: user.email };
      return findOptions;
    },
    after: (user: User) => {
      user.login = true;
      return user;
    },
  }),
  loginUser: resolver(User, {
    before: async (findOptions: any, { email }: { email: string }) => {
      findOptions.where = { email };
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
