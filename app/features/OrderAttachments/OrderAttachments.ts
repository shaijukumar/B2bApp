export interface IOrderAttachments {
	Id: string
	Url: string
	AttachmentType: string
}

export class OrderAttachments implements IOrderAttachments {
	Id: string = '';
	Url: string = '';
	AttachmentType: string = '';
  
  constructor(init?: IOrderAttachments) {
    Object.assign(this, init);
  }
}

