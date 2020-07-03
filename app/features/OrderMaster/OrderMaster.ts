import { IOrderTransactions } from "../OrderTransactions/OrderTransactions";

export interface IOrderMaster {
  Id: string;
  Reseller: string;
  Supplier: string;
  Catalog: string;
  Qty: number;
  Size: string;
  Color: string;
  ShippingAddress: string;
  BillingAddress: string;
  Status: string;
  Transactions: IOrderTransactions[];
}

export class OrderMaster implements IOrderMaster {
  Id: string = "";
  Reseller: string = "";
  Supplier: string = "";
  Catalog: string = "";
  Qty: number = 0;
  Size: string = "";
  Color: string = "";
  ShippingAddress: string = "";
  BillingAddress: string = "";
  Status: string = "";
  Transactions: IOrderTransactions[] = [];

  constructor(init?: IOrderMaster) {
    Object.assign(this, init);
  }
}
