import mongoose from 'mongoose';
import DatabaseConnectionError from '../../objects/errors/database-connection-error';
import { ReturnTypes } from '../returns';

export namespace MongooseTypes {
  export type Connection = typeof mongoose | undefined;
  export type ConnectFunction = () => ReturnTypes.AsyncTuple<
    Connection,
    DatabaseConnectionError
  >;
  export type DisconnectFunction = () => Promise<
    DatabaseConnectionError | undefined
  >;
  interface CreateConnectionArgs {
    microservice: {
      name: {
        short: string;
        long: string;
      };
    };
    environment: {
      nodeEnv: string;
      mongoDbUrl: string;
    };
    setter: {
      list: string[];
      fn: () => void;
    };
  }
  type CreateConnectionReturn = {
    connect: ConnectFunction;
    disconnect: DisconnectFunction;
  };
  export type CreateConnectionFunction = (
    args: CreateConnectionArgs
  ) => CreateConnectionReturn;
}
