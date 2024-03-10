export interface CreateVandorInput {
  name: string;
  ownerName: string;
  foodType: string[];
  pincode: string;
  address: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginVandorInput {
  password: string;
  email: string;
}

export interface VandorPayload {
  _id: string;
  email: string;
  name: string;
  foodTypes: string[];
}
