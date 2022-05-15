import nats from 'node-nats-streaming';

export namespace NatsTypes {
  export type CreateClientFunction = (
    clusterID: string,
    clientID: string,
    opts?: nats.StanOptions
  ) => Promise<nats.Stan>;

  // ticket:created event definition
  export interface TicketCreatedEventData {
    id: string;
    title: string;
    price: number;
    userId: string;
  }

  export interface TicketCreatedEvent {
    subject: 'ticket:created';
    data: TicketCreatedEventData;
  }

  // ticket:updated event definition
  export interface TicketUpdatedEventData {
    id: string;
    title: string;
    price: number;
    userId: string;
  }

  export interface TicketUpdatedEvent {
    subject: 'ticket:updated';
    data: TicketUpdatedEventData;
  }

  export type Event = TicketCreatedEvent | TicketUpdatedEvent;
}
