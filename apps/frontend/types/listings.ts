export type Add_Listing = {
  title: string;
  description: string;
  image: {
    url: string;
  };
  price: number;
  location: string;
  country: string;
};

export type PUT_Listing = {
  title: string;
  description: string;
  image: {
    url: string;
  };
  price: number;
  location: string;
  country: string;
};
