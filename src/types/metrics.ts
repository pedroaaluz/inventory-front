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
