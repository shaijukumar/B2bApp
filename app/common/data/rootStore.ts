import { createContext } from "react";
import { configure } from "mobx";
import UserStore from "./userStore";
import { NavigationStackScreenProps } from "react-navigation-stack";
import CatlogStore from "./catlogStore";
import ConfigStore from "./configStore";

configure({ enforceActions: "always" });

export interface myProps extends NavigationStackScreenProps {}

export class RootStore {
  userStore: UserStore;
  catlogStore: CatlogStore;
  configStore: ConfigStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.catlogStore = new CatlogStore(this);
    this.configStore = new ConfigStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
