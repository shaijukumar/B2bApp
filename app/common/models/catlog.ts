import { ICatalogPhoto } from "./CatalogPhoto";
import { ICategory, Category, ICategorySize } from "./Category";

export interface ICatlog {
  id?: string;
  categoryId: string;
  displayName: string;
  description?: string;
  price: string;
  photos?: ICatalogPhoto[];
  colores: any[];
  sizes: ICategorySize[];
  supplierName?: string;
  supplierId?: string;
  category?: string;
  //imageUrl?: string;
}

export class Catlog implements ICatlog {
  id?: string = undefined;
  categoryId: string = "";
  displayName: string = "";
  description?: string = "";
  price: string = "";
  photos?: ICatalogPhoto[];
  colores: any[] = [];
  sizes: ICategorySize[] = [];

  //supplierName: string = "";
  //supplierId?: string = "";
  //category?: string = "";
  //imageUrl?: string = "";
  //pcategory: ICategory = new Category();
  //subCategory: ICategory = new Category();

  constructor(init?: ICatlog) {
    Object.assign(this, init);
    //debugger;
    try {
      if (init!.colores) {
        if (init!.colores.length > 0) {
          let cList: string[] = [];

          init!.colores.forEach((col) => {
            cList.push(col.configid);
          });

          this.colores = cList;
        }
      }
    } catch (ex) {}

    this.photos = init?.photos;
  }
}
