export interface ICategory {
  id: string;
  parentId: string;
  title: string;
  icon?: string;
  sizeType?: string;
}

export class Category implements ICategory {
  id: string = "";
  parentId: string = "";
  title: string = "";
  icon?: string = "";
  sizeType?: string = "";
}

export interface ICategoryGroup {
  id: string;
  parentId: string;
  title: string;
  icon?: string;
  sizeType?: string;
  subCategory: ICategory[];
}

export class CategoryGroup implements ICategory {
  id: string = "";
  parentId: string = "";
  title: string = "";
  icon?: string = "";
  sizeType?: string = "";
  subCategory: ICategory[] = [];

  constructor(init?: ICategory) {
    Object.assign(this, init);
    this.subCategory = [];
    //this.photos = init?.photos;
  }
}

export interface ICategorySize {
  //id: string;
  configid: string;
  title: string;
  selected: boolean;
  qty?: number;
  color?: string;
}

export class CategorySize implements ICategorySize {
  // id: string = "";
  configid: string = "";
  title: string = "";
  selected: boolean = false;
  qty?: number = 0;
  color?: string = "";
  constructor(init?: ICategorySize) {
    Object.assign(this, init);
  }
}
