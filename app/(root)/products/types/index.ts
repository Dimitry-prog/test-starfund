export type ProductsResponseType = {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: DimensionsType;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ReviewType[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  MetaType: MetaType;
  thumbnail: string;
  images: string[];
};

type DimensionsType = {
  width: number;
  height: number;
  depth: number;
};

type MetaType = {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
};

export type ReviewType = {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProductsQueryType = {
  limit?: number;
  skip?: number;
  page?: string;
  search?: string;
  order?: string;
  sortBy?: string;
};
