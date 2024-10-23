export type TListProductsParams = {
  userId: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  pageSize?: string;
  suppliersIds?: string[];
  orderBy?: "asc" | "desc";
};
export interface Product {
  id: string;
  name?: string;
  description?: string;
  stockQuantity: number;
  unitPrice?: number;
  expirationDate?: Date;
  userId: string;
  image?: string;
  positionInStock?: string;
  minimumIdealStock?: number;
  productionCost?: number;
  categoriesIds?: string[];
  suppliersIds?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ICreateProductResponse {
  message: string;
  product: Omit<Product, "categoriesIds" | "suppliersIds">;
  status: number;
}

export interface IUpdateProductResponse {
  message: string;
  product: Product;
  status: number;
}
export interface IListProductsOutput {
  message: string;
  page: number;
  pageSize: number;
  totalProducts: number;
  totalPages: number;
  products: (Omit<Product, "categoriesIds" | "suppliersIds"> & {
    nameNormalized: string;
    categories: {
      name: string;
      id: string;
    }[];
    suppliers: {
      name: string;
      nameNormalized: string;
      id: string;
    }[];
  })[];
}

export interface IGetProductOutput {
  product: {
    id: string;
    name: string;
    categories: {
      name: string;
      id: string;
    }[];
    suppliers: {
      name: string;
      nameNormalized: string;
      id: string;
    }[];
    image: string | null;
    description: string | null;
    stockQuantity: number;
    unitPrice: number;
    positionInStock: string | null;
    expirationDate: string | null;
    createdAt: string;
    deletedAt: string | null;
    updatedAt: string;
    productionCost: number;
    minimumIdealStock: number | null;
  };
}
