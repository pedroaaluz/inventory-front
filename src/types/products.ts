export type TListProductsParams = {
  userId: string;
  name?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  page?: string | undefined;
  pageSize?: string | undefined;
  orderBy?: "asc" | "desc" | undefined;
};

export interface IListProductsOutput {
  message: string;
  page: number;
  pageSize: number;
  totalProducts: number;
  totalPages: number;
  products: {
    nameNormalized: string;
    id: string;
    name: string;
    image: string | null;
    description: string | null;
    stockQuantity: number;
    unitPrice: number;
    positionInStock: string | null;
    expirationDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    categories: {
      name: string;
      id: string;
    }[];
    suppliers: {
      name: string;
      nameNormalized: string;
      id: string;
    }[];
  }[];
}
