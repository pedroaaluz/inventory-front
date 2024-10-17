export type EnumMovementsType = "SALE" | "ADD_TO_STOCK" | "REMOVE_FROM_STOCK";
export type EnumPaymentMethodType = "PIX" | "DEBIT" | "CREDIT" | "CASH";

export type TListMovementParams = {
  userId: string;
  productName?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  pageSize?: string;
  orderBy?: "asc" | "desc";
  productsIds?: string[];
  paymentMethod?: EnumPaymentMethodType;
  movementType?: EnumMovementsType;
};

export interface IListMovementOutput {
  message: string;
  page: number;
  pageSize: number;
  totalMovements: number;
  totalPages: number;
  movements: {
    id: string;
    movementType: EnumMovementsType;
    quantity: number;
    productId: string;
    productName: string;
    productNameNormalized: string;
    userId: string;
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date;
    movementValue: number | null;
    paymentMethod: EnumPaymentMethodType | null;
    productImage: string | null;
  }[];
}
