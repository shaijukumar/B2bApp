export interface ICategory {
  Id: string;
  ParentId: string;
  Title: string;
  icon?: string;
  SizeType?: string;
}

export class Category implements ICategory {
  Id: string = "";
  ParentId: string = "";
  Title: string = "";
  icon?: string = "";
  SizeType?: string = "";
}

export interface ICategoryGroup {
  Id: string;
  ParentId: string;
  Title: string;
  icon?: string;
  SizeType?: string;
  subCategory: ICategory[];
}

export class CategoryGroup implements ICategory {
  Id: string = "";
  ParentId: string = "";
  Title: string = "";
  icon?: string = "";
  SizeType?: string = "";
  subCategory: ICategory[] = [];

  constructor(init?: ICategory) {
    Object.assign(this, init);
    this.subCategory = [];
    //this.photos = init?.photos;
  }
}

export interface ICategorySize {
  //Id: string;
  configid: string;
  Title: string;
  selected: boolean;
  Qty?: number;
  color?: string;
  OrderSelected?: boolean;
}

export class CategorySize implements ICategorySize {
  // Id: string = "";
  configid: string = "";
  Title: string = "";
  selected: boolean = false;
  Qty?: number = 0;
  color?: string = "";
  OrderSelected = false;
  constructor(init?: ICategorySize) {
    Object.assign(this, init);
  }
}
