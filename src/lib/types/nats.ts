import nats from 'node-nats-streaming';

export namespace NatsTypes {
  export type CreateClientFunction = (
    clusterID: string,
    clientID: string,
    opts?: nats.StanOptions
  ) => Promise<nats.Stan>;

  export interface TicketCreatedEventData {
    id: string;
    title: string;
    price: number;
  }

  export interface TicketCreatedEvent {
    subject: 'ticket:created';
    data: TicketCreatedEventData;
  }

  export type Event = TicketCreatedEvent;
}
