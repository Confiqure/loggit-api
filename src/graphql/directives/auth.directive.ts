import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { User } from '../../models';
import to from 'await-to-js';

export class IsAuthUserDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field; //This is confusing javascript syntax here is a link that describes what is going on: https://javascript.info/destructuring-assignment
    field.resolve = async function(...args: any[]) {
      let authUser: User, user: User;
      [user, {}, { authUser }] = args;
      if ((authUser && authUser.username === user.username) || user.login) {
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new Error(
          'You must be the authenticated user to get this information'
        );
      }
    };
  }
}

export class IsAuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args: any) {
      let userInfo: User;
      [, {}, { user: userInfo }] = args;
      if (!userInfo) {
        throw new Error('User not authenticated');
      }

      let err: string | null, authUser: User | null | undefined;
      [err, authUser] = await to(
        Promise.resolve(
          User.findOne({ where: { username: userInfo.username } })
        )
      );
      if (!authUser) {
        throw new Error(
          'JWT token received, User not found, and not authenticated'
        );
      }

      args[2].authUser = authUser;
      return resolve.apply(this, args);
    };
  }
}
