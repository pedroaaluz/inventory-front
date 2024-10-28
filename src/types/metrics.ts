export interface IPaymentMethodUsedParams {
  startDate: string;
  endDate: string;
  userId: string;
}

export interface IPaymentMethodUsedOutput {
  message: string;
  paymentMethodUsed: {
    creditCard: number;
    debitCard: number;
    cash: number;
    pix: number;
  };
}

export interface IProductNearIdealStockParams {
  message: string;
  page: number;
  pageSize: number;
  totalProducts: number;
  totalPages: number;
  productsNearIdealStock: {
    id: string;
    name: string;
    image: string | null;
    stockQuantity: number;
    minimumIdealStock: number;
    supplierEmail: string | null;
    supplierPhone: string | null;
  }[];
}

export interface ITopSellingResponse {
  products: {
    salesCount: number;
    salesValue: number;
    productName: string;
    productId: string;
    productImage: string | null;
    stockQuantity: number;
  }[];
  message: string;
  totalPages: number;
  page: number;
  pageSize: number;
  totalProducts: number;
}

export interface IStockMetricsResponse {
  products: {
    id: string;
    name: string;
    image: string | null;
    totalSales: number;
    stockQuantity: number;
    averageConsumption: number;
    stockCoverage: number;
    turnoverRate: number;
    minimumIdealStock: number;
  }[];
  message: string;
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
