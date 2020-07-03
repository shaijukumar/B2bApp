import { observable, action, runInAction } from "mobx";

import agent from "../../common/agent";
import { RootStore } from "../../common/rootStore";
import { OrderMaster, IOrderMaster } from "./OrderMaster";

const IOrderMasterAPI = "/TestApp";
const DBFun = {
  list: (): Promise<IOrderMaster[]> => agent.requests.get(IOrderMasterAPI),
  details: (Id: string) => agent.requests.get(`${IOrderMasterAPI}/${Id}`),
  create: (item: IOrderMaster) => agent.requests.post(IOrderMasterAPI, item),
  update: (item: IOrderMaster) =>
    agent.requests.put(`${IOrderMasterAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${IOrderMasterAPI}/${Id}`),
};

export default class OrderMasterStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable loadingInitial = false;
  @observable item: OrderMaster = new OrderMaster();
  @observable itemList: IOrderMaster[] = [];

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
      let list: IOrderMaster[] = [];
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

  @action createItem = async (orderMaster: IOrderMaster) => {
    this.submitting = true;
    try {
      let itm = await DBFun.create(orderMaster);
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

  @action editItem = async (orderMaster: IOrderMaster) => {
    debugger;
    this.submitting = true;
    try {
      let itm = await DBFun.update(orderMaster);
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

