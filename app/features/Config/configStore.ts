import { observable, computed, action, runInAction, flow } from "mobx";

import { RootStore } from "../../common/rootStore";
import agent from "../../common/agent";
import {
  ICategory,
  CategoryGroup,
  ICategorySize,
  CategorySize,
} from "../Catlog/Category";

import { IAppConfig } from "./AppConfig";
import _ from "lodash";

export class PickerItem {
  Id: string = "";
  name: string = "";
  children: PickerItem[] = [];
  constructor(Id: string, name: string) {
    this.Id = Id;
    this.name = name;
    this.children = [];
  }
}

export class ColorItem {
  Id: string = "";
  name: string = "";
  children: ColorItem[] = [];
  constructor(Id: string, name: string) {
    this.Id = Id;
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
      if (con.Category == "Color") {
        items.push(new ColorItem(con.Id, con.Title));
      }
    });
    //console.log(items);
    return items;
  }

  upconIdParentChildCategory(categoryList: ICategory[]) {
    //debugger;
    let items: PickerItem[] = [];

    categoryList.forEach((cat) => {
      if (cat.Id == cat.ParentId) {
        items.push(new PickerItem(cat.Id, cat.Title));
      }
    });

    items.forEach((grp) => {
      categoryList.forEach((cat) => {
        if (cat.ParentId == grp.Id) {
          let item: PickerItem = new PickerItem(cat.Id, cat.Title);
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
    Id: string,
    initialValue: any,
    appConfigList: IAppConfig[],
    categoryList: ICategory[]
  ) {
    //debugger;
    let configs: ICategorySize[] = [];

    let r = categoryList.find((x) => x.Id == Id);

    if (r!.SizeType != undefined) {
      if (appConfigList != null) {
        appConfigList.forEach((con) => {
          if (con.Category == r!.SizeType) {
            let Qty = 0;
            let selected = false;
            //console.log("==============initialValue==================");
            if (initialValue.length > 0) {
              initialValue.forEach((v) => {
                if (v.configid == con.Id) {
                  selected = true;
                  Qty = v.Qty;
                }
              });
            }

            let size: CategorySize = new CategorySize({
              //Id: "",
              configid: con.Id,
              Title: con.Title,
              selected: selected,
              Qty: Qty,
              color: "",
            });
            configs.push(size);
          }
        });
      }
    }

    if (configs.length == 0) {
      let size: CategorySize = new CategorySize({
        //Id: "",
        configid: "",
        Title: "Qty",
        selected: true,
        Qty: 0,
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
      const conId = con.Category;
      configs[conId] = configs[conId] ? [...configs[conId], con] : [con];
    });

    this.appConfigListCategory = configs;
  }

  
}
