export interface Product {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  brand: {
    _id: string;  
    name: string;
  };
  name: string;
  price: number;
}

export interface Brand {
  _id: string;
  name: string;
}
