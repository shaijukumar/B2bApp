import { ICatalogPhoto } from "./CatalogPhoto";
import { ICategory, Category, ICategorySize } from "./Category";

export interface ICatlogList {
  Id?: string;
  DisplayName: string;
  ImageUrl: string;
  Category: string;
}

export interface ICatlog {
  Id?: string;
  CategoryId: string;
  DisplayName: string;
  Description?: string;
  Price: string;
  Photos?: ICatalogPhoto[];
  Colores: any[];
  Sizes: ICategorySize[];
  SupplierName?: string;
  SupplierId?: string;
  Category?: string;
  //ImageUrl?: string;
}

export class Catlog implements ICatlog {
  Id?: string = undefined;
  CategoryId: string = "";
  DisplayName: string = "";
  Description?: string = "";
  Price: string = "";
  Photos?: ICatalogPhoto[];
  Colores: any[] = [];
  Sizes: ICategorySize[] = [];

  constructor(init?: ICatlog) {
    Object.assign(this, init);
    //debugger;
    try {
      if (init!.Colores) {
        if (init!.Colores.length > 0) {
          let cList: string[] = [];

          init!.Colores.forEach((col) => {
            cList.push(col.configid);
          });

          this.Colores = cList;
        }
      }
    } catch (ex) {}

    this.Photos = init?.Photos;
  }
}
