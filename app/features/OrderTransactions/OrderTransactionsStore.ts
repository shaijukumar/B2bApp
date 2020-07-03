import { observable, action, runInAction } from "mobx";

import agent from "../../common/agent";
import { RootStore } from "../../common/rootStore";
import { OrderTransactions, IOrderTransactions } from "./OrderTransactions";

const IOrderTransactionsAPI = "/TestApp";
const DBFun = {
  list: (): Promise<IOrderTransactions[]> => agent.requests.get(IOrderTransactionsAPI),
  details: (Id: string) => agent.requests.get(`${IOrderTransactionsAPI}/${Id}`),
  create: (item: IOrderTransactions) => agent.requests.post(IOrderTransactionsAPI, item),
  update: (item: IOrderTransactions) =>
    agent.requests.put(`${IOrderTransactionsAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${IOrderTransactionsAPI}/${Id}`),
};

export default class OrderTransactionsStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable loadingInitial = false;
  @observable item: OrderTransactions = new OrderTransactions();
  @observable itemList: IOrderTransactions[] = [];

  @action loadItem = async (id: string) => {
    this.loadingInitial = true;
    try {
      let catlog = await DBFun.details(id);
      runInAction("getting item", () => {
        this.loadingInitial = false;
        this.item = catlog;
      });
      return catlog;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action getList = async () => {
    this.loadingInitial = true;
    try {
      let list: IOrderTransactions[] = [];
      list = await DBFun.list();
      runInAction("loading items", () => {
        this.itemList = list;
        this.loadingInitial = false;
      });
      return list;
    } catch (error) {
      runInAction("loading items error, ", () => {
        this.submitting = false;
        console.log(error);
        throw error;
      });
    }
  };

  @action createItem = async (orderTransactions: IOrderTransactions) => {
    this.submitting = true;
    try {
      let itm = await DBFun.create(orderTransactions);
      runInAction("create item", () => {
        this.item = itm;
        this.submitting = false;
      });
      return itm;
    } catch (error) {
      console.log(error);
      runInAction("create item error", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  @action editItem = async (orderTransactions: IOrderTransactions) => {
    debugger;
    this.submitting = true;
    try {
      let itm = await DBFun.update(orderTransactions);
      runInAction("editing item", () => {
        this.submitting = false;
      });
      return itm;
    } catch (error) {
      runInAction("edit item error", () => {
        this.submitting = false;
      });
      console.log(error);
      throw error;
    }
  };

  @action deleteItem = async (id: string) => {
    this.submitting = true;
    try {
      await DBFun.delete(id);
      runInAction("deleting item", () => {
        this.submitting = false;
      });
    } catch (error) {
      runInAction("Item delete error, ", () => {
        this.submitting = false;
      });
      console.log(error);
      throw error;
    }
  };
}

