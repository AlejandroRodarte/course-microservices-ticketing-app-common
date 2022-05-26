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
    version: number;
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
    version: number;
    orderId?: string;
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
    version: number;
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
    version: number;
    ticket: {
      id: string;
    };
  }

  export interface OrderCancelledEvent {
    subject: 'order:cancelled';
    data: OrderCancelledEventData;
  }

  // expiration:complete event definition
  export interface ExpirationCompleteEventData {
    order: {
      id: string;
    };
  }

  export interface ExpirationCompleteEvent {
    subject: 'expiration:complete';
    data: ExpirationCompleteEventData;
  }

  // payment:duplicate-order event definition
  export interface PaymentDuplicateOrderData {
    order: {
      id: string;
    };
  }

  export interface PaymentDuplicateOrder {
    subject: 'payment:duplicate-order';
    data: PaymentDuplicateOrderData;
  }

  export type Event =
    | TicketCreatedEvent
    | TicketUpdatedEvent
    | OrderCreatedEvent
    | OrderCancelledEvent
    | ExpirationCompleteEvent
    | PaymentDuplicateOrder;
}
