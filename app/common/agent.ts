import axios, { AxiosResponse } from "axios";

import { getToken } from "../common/token";
import { IUser, IUserFormValues } from "../features/user/user";
import { ICatlog, ICatlogList } from "../features/Catlog/Catlog";
import { ICategory } from "../features/Catlog/Category";
import { ICatalogPhotoDeleteParm } from "../features/Catlog/CatalogPhoto";
import { IAppConfig } from "../features/Config/AppConfig";

axios.defaults.baseURL = "http://192.168.1.105:5000/api";

axios.interceptors.request.use(
  (config) =>
    new Promise((resolve, reject) => {
      getToken().then((token) => {
        // debugger;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        resolve(config);
      }, reject);
    })
);
 
const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), 10)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(10)).then(responseBody),

  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(10)).then(responseBody),

  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(10)).then(responseBody),

  del: (url: string) => axios.delete(url).then(sleep(10)).then(responseBody),

  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),

  //uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
};

const CatalogItem = {
  list: (): Promise<ICatlogList[]> => requests.get("/Catalog"),
  categoryList: (): Promise<ICategory[]> => requests.get("/Category"),
  details: (id: string) => requests.get(`/Catalog/${id}`),
  create: (page: ICatlog) => requests.post("/Catalog", page),
  update: (page: ICatlog) => requests.put(`/Catalog/${page.Id}`, page),
  delete: (id: string) =>
    requests.del(`/Catalog/${id}`).then(sleep(400)).then(responseBody),
  phtoUpload: (id: string, formData: FormData) =>
    requests.post(`/CatalogPhoto/${id}`, formData),
  deletePhoto: (data: ICatalogPhotoDeleteParm) =>
    requests.post("/Catalog/DeleteCatalogPhoto/", data),
  ResellerCatalogList: (id: string) =>
    requests.get(`/Catalog/ResellerCatalogList/${id}`),
};

const CategoryItem = {
  list: (): Promise<ICategory[]> => requests.get("/Category"),
};

const AppConfigItem = {
  list: (): Promise<IAppConfig[]> => requests.get("/AppConfig"),
};

export default {
  requests,
  User,
  CatalogItem,
  CategoryItem,
  AppConfigItem,
};
