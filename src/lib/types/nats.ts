import nats from 'node-nats-streaming';
import { OrderResourceTypes } from './resources/order';

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

  // order:created event definition
  export interface OrderCreatedEventData {
    id: string;
    status: OrderResourceTypes.Status;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  }

  export interface OrderCreatedEvent {
    subject: 'order:created';
    data: OrderCreatedEventData;
  }

  // order:cancelled event definition
  export interface OrderCancelledEventData {
    id: string;
    ticket: {
      id: string;
    };
  }

  export interface OrderCancelledEvent {
    subject: 'order:cancelled';
    data: OrderCancelledEventData;
  }

  export type Event =
    | TicketCreatedEvent
    | TicketUpdatedEvent
    | OrderCreatedEvent
    | OrderCancelledEvent;
}
