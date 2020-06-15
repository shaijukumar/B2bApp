import { observable, computed, action, runInAction, flow } from "mobx";

import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";
import agent from "../data/agent";
import {
  ICategory,
  CategoryGroup,
  ICategorySize,
  CategorySize,
} from "../models/Category";
import { IAppConfig } from "../models/AppConfig";
import _ from "lodash";

export class PickerItem {
  id: string = "";
  name: string = "";
  children: PickerItem[] = [];
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.children = [];
  }
}

export class ColorItem {
  id: string = "";
  name: string = "";
  children: ColorItem[] = [];
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.children = [];
  }
}

export default class ConfigStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable configLoading = false;
  @observable categoryList: ICategory[] = [];
  @observable categoryGroup: CategoryGroup[] = [];
  @observable appConfigList: IAppConfig[] = [];

  @observable appConfigListCategory: any = [];

  // @observable categorys: ICategory[] = [];
  @observable categorys: PickerItem[] = [];
  @observable subCategorys = {};

  @observable colorList: ColorItem[] = [];

  @action updateConfig = async () => {
    //debugger;
    this.configLoading = true;
    let l1: ICategory[] = [];
    let l2: IAppConfig[] = [];

    try {
      //let l2 = await agent.AppConfigItem.list();
      await agent.CategoryItem.list().then(async (list) => {
        l1 = list;
        l2 = await agent.AppConfigItem.list();
      });
      runInAction("loading Config", () => {
        // debugger;
        this.categoryList = l1;
        this.upconIdParentChildCategory(l1);
        this.groupAppConfigbyId(l2);
        this.colorList = this.getColorList(l2);
        //debugger;
        //console.log(this.appConfigListCategory);
        this.appConfigList = l2;
        this.configLoading = false;
      });
      //debugger;
      return l2;
    } catch (error) {
      runInAction("upcatIdConfig error", () => {
        this.configLoading = false;
        console.log(error);
      });
    }
  };

  getColorList(conList: IAppConfig[]) {
    //debugger;
    let items: ColorItem[] = [];
    conList.forEach((con) => {
      if (con.category == "Color") {
        items.push(new ColorItem(con.id, con.title));
      }
    });
    //console.log(items);
    return items;
  }

  upconIdParentChildCategory(categoryList: ICategory[]) {
    //debugger;
    let items: PickerItem[] = [];

    categoryList.forEach((cat) => {
      if (cat.id == cat.parentId) {
        items.push(new PickerItem(cat.id, cat.title));
      }
    });

    items.forEach((grp) => {
      categoryList.forEach((cat) => {
        if (cat.parentId == grp.id) {
          let item: PickerItem = new PickerItem(cat.id, cat.title);
          grp.children.push(item);
        }
      });
    });

    //debugger;
    this.categorys = items;
    //console.log("categorys");
    //console.log(items);
  }

  @action getSizeList(
    id: string,
    initialValue: any,
    appConfigList: IAppConfig[],
    categoryList: ICategory[]
  ) {
    let configs: ICategorySize[] = [];

    let r = categoryList.find((x) => x.id == id);

    if (r!.sizeType != undefined) {
      if (appConfigList != null) {
        appConfigList.forEach((con) => {
          if (con.category == r!.sizeType) {
            let qty = 0;
            let selected = false;
            //console.log("==============initialValue==================");
            if (initialValue.length > 0) {
              initialValue.forEach((v) => {
                if (v.configid == con.id) {
                  selected = true;
                  qty = v.qty;
                }
              });
            }

            let size: CategorySize = new CategorySize({
              //id: "",
              configid: con.id,
              title: con.title,
              selected: selected,
              qty: qty,
              color: "",
            });
            configs.push(size);
          }
        });
      }
    }

    if (configs.length == 0) {
      let size: CategorySize = new CategorySize({
        //id: "",
        configid: "",
        title: "Qty",
        selected: true,
        qty: 0,
        color: "",
      });
      configs.push(size);
    }
    //console.log(configs);

    if (configs.length == 1) {
      configs[0].selected = true;
    }
    return configs;
  }

  groupAppConfigbyId(configList: IAppConfig[]) {
    let configs: any[] = [];
    configList.forEach((con) => {
      const conId = con.category;
      configs[conId] = configs[conId] ? [...configs[conId], con] : [con];
    });

    //debugger;
    this.appConfigListCategory = configs;

    // let t = Object.entries(
    //   configList.reduce((configs, con) => {
    //     const conId = con.category;
    //     configs[conId] = configs[conId] ? [...configs[conId], con] : [con];
    //     return configs;
    //   }, {} as { [key: string]: IAppConfig[] })
    // );
    // debugger;
    // this.appConfigListCategory = t;
  }
}
