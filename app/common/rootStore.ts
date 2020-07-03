import { createContext } from "react";
import { configure } from "mobx";
import { NavigationStackScreenProps } from "react-navigation-stack";

import UserStore from "../features/user/userStore";
import CatlogStore from "../features/Catlog/CatlogStore";
import ConfigStore from "../features/Config/configStore";
import OrderAttachmentsStore from "../features/OrderAttachments/OrderAttachmentsStore";
import OrderTransactionsStore from "../features/OrderTransactions/OrderTransactionsStore";
import OrderMasterStore from "../features/OrderMaster/OrderMasterStore";

//##RootImport##

configure({ enforceActions: "always" });

export interface myProps extends NavigationStackScreenProps {}

export class RootStore { 
  userStore: UserStore;
  catlogStore: CatlogStore;
  configStore: ConfigStore;
  orderAttachmentsStore: OrderAttachmentsStore;
  orderTransactionsStore: OrderTransactionsStore;
  orderMasterStore: OrderMasterStore;
  //##RootField##

  constructor() {
    this.userStore = new UserStore(this);
    this.catlogStore = new CatlogStore(this);
    this.configStore = new ConfigStore(this);
    this.orderAttachmentsStore = new OrderAttachmentsStore(this);
    this.orderTransactionsStore = new OrderTransactionsStore(this);
    this.orderMasterStore = new OrderMasterStore(this);
    //##RootFieldConstructor##
  }
}

export const RootStoreContext = createContext(new RootStore());
