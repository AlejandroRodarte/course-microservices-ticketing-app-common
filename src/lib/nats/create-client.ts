import nats from 'node-nats-streaming';
import { NatsTypes } from '../types/nats';

const createClient: NatsTypes.CreateClientFunction = (
  clusterID: string,
  clientID: string,
  opts?: nats.StanOptions
) => {
  const client = nats.connect(clusterID, clientID, opts);

  return new Promise<nats.Stan>((resolve, reject) => {
    client.on('connect', () => {
      console.log('Client connected to NATS.');
      resolve(client);
    });
  });
};

export default createClient;
