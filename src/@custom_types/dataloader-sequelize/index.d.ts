declare module 'dataloader-sequelize' {
  import { Sequelize } from 'sequelize-typescript';
  export function createContext(sequelize: Sequelize, options?: any): any;
  export const EXPECTED_OPTIONS_KEY: unique symbol;
}
