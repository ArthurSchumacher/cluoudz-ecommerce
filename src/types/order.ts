import { Address } from "./address";
import { OrderProduct } from "./orderProduct";
import { Payment } from "./payment";
import { Status } from "./status";

export type Order = {
  id: string;
  date: string;
  created_at: string;
  updated_at: string;
  address: Address;
  orderProduct: OrderProduct[];
  payment: Payment;
  status: Status;
};
