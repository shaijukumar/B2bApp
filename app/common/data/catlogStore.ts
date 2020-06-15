import { observable, computed, action, runInAction, flow } from "mobx";

import { ICatlog, Catlog } from "../models/catlog";
import { RootStore } from "./rootStore";
import agent from "../data/agent";
import { ICategory } from "../models/Category";
import {
  ICatalogPhoto,
  CatalogPhoto,
  ICatalogPhotoDeleteParm,
} from "../models/CatalogPhoto";

export default class CatlogStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable updatingImage = false;
  @observable loadingInitial = false;
  @observable itemList: ICatlog[] = [];
  @observable catalogItem: Catlog = new Catlog();
  @observable categoryList: ICategory[] = [];
  @observable photo: CatalogPhoto = new CatalogPhoto();

  @action loadCategoryItem = async (id: string) => {
    //console.log("loadCategoryItem");
    this.loadingInitial = true;
    try {
      let catlog = await agent.CatalogItem.details(id);
      runInAction("getting page", () => {
        // debugger;
        this.loadingInitial = false;
        this.catalogItem = catlog;
      });
      return catlog;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action getListwithCategories = async (id: string) => {
    // debugger;
    //console.log("getListwithCategories");
    this.loadingInitial = true;
    try {
      this.getCategoriesList().then(async (cl) => {
        let catlog = await agent.CatalogItem.details(id);
        runInAction("getting page", () => {
          catlog.categoryId = cl.filter((x) => x.id === catlog.categoryId)[0];
          this.catalogItem = catlog;
          this.loadingInitial = false;
        });
        return catlog;
      });
    } catch (error) {
      runInAction("catlog error, ", () => {
        this.submitting = false;
        console.log(error);
        throw error;
      });
    }
  };

  @action getList = async () => {
    //console.log("getList");
    //debugger;
    this.loadingInitial = true;
    try {
      let list: ICatlog[] = [];
      list = await agent.CatalogItem.list();
      runInAction("loading Catalogs", () => {
        this.itemList = list;
        //debugger;
        this.loadingInitial = false;
      });
      return list;
    } catch (error) {
      runInAction("catlog error, ", () => {
        this.submitting = false;
        console.log(error);
        throw error;
      });
    }
  };

  @action createItem = async (catlog: ICatlog) => {
    debugger;
    this.submitting = true;
    try {
      let cat = await agent.CatalogItem.create(catlog);
      runInAction("create catlog", () => {
        this.catalogItem = cat;
        this.submitting = false;
      });
      return cat;
    } catch (error) {
      debugger;
      console.log(error);
      runInAction("create catlog error", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  @action editItem = async (catlog: ICatlog) => {
    debugger;
    this.submitting = true;
    try {
      let cat = await agent.CatalogItem.update(catlog);
      runInAction("editing catlog", () => {
        this.submitting = false;
      });
      return cat;
    } catch (error) {
      runInAction("edit page error", () => {
        this.submitting = false;
      });
      console.log(error);
      throw error;
    }
  };

  @action deleteItem = async (id: string) => {
    this.submitting = true;
    try {
      await agent.CatalogItem.delete(id);
      runInAction("deleting catlog", () => {
        this.submitting = false;
      });
    } catch (error) {
      runInAction("delete catlog error, ", () => {
        this.submitting = false;
      });
      console.log(error);
      throw error;
    }
  };

  @action getCategoriesList = async () => {
    //console.log("getCategoriesList");
    debugger;
    if (this.categoryList.length != 0) {
      return this.categoryList;
    }

    // debugger;
    this.loadingInitial = true;
    let list = await agent.CategoryItem.list();
    runInAction("loading Category", () => {
      //this.loadingInitial = false;
      this.categoryList = list;
      //debugger;
    });
    return list;
  };

  @action uploadPhoto = async (id: string, formData: FormData) => {
    debugger;
    this.updatingImage = true;
    try {
      let res: ICatalogPhoto = await agent.CatalogItem.phtoUpload(id, formData);
      runInAction("catlog photo upload", () => {
        this.photo = res;
        this.updatingImage = false;
      });
      return res;
    } catch (error) {
      runInAction("catlog photo upload error", () => {
        this.updatingImage = false;
        console.log(error);
      });
    }
  };

  @action deletePhoto = async (data: ICatalogPhotoDeleteParm) => {
    debugger;
    this.submitting = true;
    try {
      await agent.CatalogItem.deletePhoto(data);
      runInAction("catlog photo delete", () => {
        this.submitting = false;
      });
    } catch (error) {
      runInAction("catlog photo upload error", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };
}
