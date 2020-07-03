import { observable, computed, action, runInAction } from "mobx";

import { IUser, IUserFormValues } from "./user";
import { RootStore } from "../../common/rootStore";
import agent from "../../common/agent";

import { setToken, getToken, deleteToken } from "../../common/token";
 
export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable loading = false;

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    this.loading = true;
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
        this.loading = false;
      });
      setToken(user.Token);
      return user;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    this.loading = true;
    try {
      const user = await agent.User.register(values);
      runInAction(() => {
        this.user = user;
        this.loading = false;
      });
      return user;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });

      throw error;
    }
  };

  // @action getUser = async () => {
  //     try {
  //       const user = await agent.User.current();
  //       runInAction(() => {
  //         this.user = user;
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  // };

  // @action logout = () => {
  //     this.rootStore.commonStore.setToken(null);
  //     this.user = null;
  //     history.push('/');
  //   };
}
