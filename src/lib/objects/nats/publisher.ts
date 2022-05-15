import nats from 'node-nats-streaming';
import { NatsTypes } from '../../types/nats';

export default abstract class Publisher<E extends NatsTypes.Event> {
  abstract subject: E['subject'];

  protected client: nats.Stan;

  constructor(client: nats.Stan) {
    this.client = client;
  }

  async publish(data: E['data']): Promise<Error | undefined> {
    return new Promise<Error | undefined>((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err, guid) => {
        if (err) resolve(err);
        else resolve(undefined);
      });
    });
  }
}
