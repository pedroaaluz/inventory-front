import axios from "axios";

type Product = {
  nameNormalized: string;
  name: string;
  image: string | null;
  description: string | null;
  stockQuantity: number;
  unitPrice: number; // assuming decimalSchema resolves to a number type
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
};

type listProductsREsponse = {
  message: string;
  page: number;
  pageSize: number;
  totalProducts: number;
  totalPages: number;
  products: Product[];
};

export const listProducts = async ({
  userId,
  name,
  startDate,
  endDate,
  page,
  pageSize,
  orderBy,
}: {
  userId: string;
  name?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  page?: number | undefined;
  pageSize?: number | undefined;
  orderBy?: "asc" | "desc" | undefined;
}) => {
  //  "https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production"
  /* const response = await fetch({
    method: "GET",
    url: "https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production",
  });
  return response.json(); */

  const response = await axios.get<listProductsREsponse>(
    "https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production",
    {
      params: {
        userId,
        name,
        startDate,
        endDate,
        page,
        pageSize,
        orderBy,
      },
    }
  );

  return response.data;
};
