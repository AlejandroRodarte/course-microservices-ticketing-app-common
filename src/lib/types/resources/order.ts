export namespace OrderResourceTypes {
  export type Status =
    | 'created'
    | 'cancelled'
    | 'awaiting:payment'
    | 'complete';
}
