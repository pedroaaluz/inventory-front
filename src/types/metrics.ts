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
