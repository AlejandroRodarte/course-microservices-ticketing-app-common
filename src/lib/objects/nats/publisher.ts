import nats from 'node-nats-streaming';
import { NatsTypes } from '../../types/nats';
import NatsPublisherError from '../errors/nats-publisher-error';

export default abstract class Publisher<E extends NatsTypes.Event> {
  abstract subject: E['subject'];

  protected client: nats.Stan;

  constructor(client: nats.Stan) {
    this.client = client;
  }

  async publish(data: E['data']): Promise<NatsPublisherError | undefined> {
    return new Promise<NatsPublisherError | undefined>((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err, guid) => {
        if (err) resolve(new NatsPublisherError(err.message));
        else resolve(undefined);
      });
    });
  }
}
