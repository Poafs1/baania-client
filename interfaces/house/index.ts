export interface IHouse {
  id: string;
  name: string;
  desc: string;
  price: string;
  post_code: string;
}

export interface IHouseCreate {
  name: string;
  postCode: string;
  price: string;
  description: string;
}
