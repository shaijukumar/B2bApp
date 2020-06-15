export interface ICatalogPhoto {
  id: string;
  url: string;
  IsMain?: string;
}

export class CatalogPhoto implements ICatalogPhoto {
  id: string = "";
  url: string = "";
  IsMain?: string = "";

  constructor(init?: ICatalogPhoto) {
    Object.assign(this, init);
  }
}

export interface ICatalogPhotoDeleteParm {
  CatalogId: string;
  PhotoId: string;
}

export class CatalogPhotoDeleteParm implements ICatalogPhotoDeleteParm {
  CatalogId: string = "";
  PhotoId: string = "";
  constructor(init?: ICatalogPhotoDeleteParm) {
    Object.assign(this, init);
  }
}
