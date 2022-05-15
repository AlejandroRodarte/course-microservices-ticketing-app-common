import nats from 'node-nats-streaming';
import { NatsTypes } from '../../types/nats';
import NatsError from '../errors/nats-error';

export default abstract class Publisher<E extends NatsTypes.Event> {
  abstract subject: E['subject'];

  protected client: nats.Stan;

  constructor(client: nats.Stan) {
    this.client = client;
  }

  async publish(data: E['data']): Promise<NatsError | undefined> {
    return new Promise<NatsError | undefined>((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err, guid) => {
        if (err) resolve(new NatsError(err.message));
        else resolve(undefined);
      });
    });
  }
}
