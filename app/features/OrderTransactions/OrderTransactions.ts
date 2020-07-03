import { IOrderAttachments } from "../OrderAttachments/OrderAttachments";

export interface IOrderTransactions {
  Id: string;
  TimeStamp: string;
  Action: string;
  Comment: string;
  Attachments: IOrderAttachments[];
}

export class OrderTransactions implements IOrderTransactions {
  Id: string = "";
  TimeStamp: string = "";
  Action: string = "";
  Comment: string = "";
  Attachments: IOrderAttachments[] = [];

  constructor(init?: IOrderTransactions) {
    Object.assign(this, init);
  }
}
