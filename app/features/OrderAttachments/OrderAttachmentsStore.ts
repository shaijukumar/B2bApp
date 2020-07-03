import { observable, action, runInAction } from "mobx";

import { OrderAttachments, IOrderAttachments } from "./OrderAttachments";
import agent from "../../common/agent";
import { RootStore } from "../../common/rootStore";

const IOrderAttachmentsAPI = "/TestApp";
const DBFun = {
  list: (): Promise<IOrderAttachments[]> =>
    agent.requests.get(IOrderAttachmentsAPI),
  details: (Id: string) => agent.requests.get(`${IOrderAttachmentsAPI}/${Id}`),
  create: (item: IOrderAttachments) =>
    agent.requests.post(IOrderAttachmentsAPI, item),
  update: (item: IOrderAttachments) =>
    agent.requests.put(`${IOrderAttachmentsAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${IOrderAttachmentsAPI}/${Id}`),
};

export default class OrderAttachmentsStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable loadingInitial = false;
  @observable item: OrderAttachments = new OrderAttachments();
  @observable itemList: IOrderAttachments[] = [];

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
      let list: IOrderAttachments[] = [];
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

  @action createItem = async (orderAttachments: IOrderAttachments) => {
    this.submitting = true;
    try {
      let itm = await DBFun.create(orderAttachments);
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

  @action editItem = async (orderAttachments: IOrderAttachments) => {
    debugger;
    this.submitting = true;
    try {
      let itm = await DBFun.update(orderAttachments);
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
