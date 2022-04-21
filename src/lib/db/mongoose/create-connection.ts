import mongoose from 'mongoose';
import DatabaseConnectionError from '../../objects/errors/database-connection-error';
import { MongooseTypes } from '../../types/db/mongoose';

const createConnection: MongooseTypes.CreateConnectionFunction = (args) => {
  let connection: MongooseTypes.Connection = undefined;

  const connect: MongooseTypes.ConnectFunction = async () => {
    if (connection) return [connection, undefined];
    try {
      if (
        args.setter.list.includes(process.env[args.environment.nodeEnv] || '')
      )
        args.setter.fn();
      connection = await mongoose.connect(
        process.env[args.environment.mongoDbUrl]!
      );
      console.log(
        `[${
          args.microservice.name.short
        }] Succesfully connected to MongoDB database at ${
          process.env[args.environment.mongoDbUrl]
        }.`
      );
      return [connection, undefined];
    } catch (e) {
      return [
        undefined,
        new DatabaseConnectionError(
          'There was a problem connecting to the database.'
        ),
      ];
    }
  };

  const disconnect: MongooseTypes.DisconnectFunction = async () => {
    if (connection) {
      try {
        await connection.disconnect();
        console.log(
          `[${args.microservice.name.short}] Succesfully disconnected from the database in the ${args.microservice.name.long} microservice.`
        );
        connection = undefined;
        return undefined;
      } catch (e) {
        return new DatabaseConnectionError(
          'There was a problem disconnecting from the database.'
        );
      }
    }
    return undefined;
  };

  return { connect, disconnect };
};

export default createConnection;
