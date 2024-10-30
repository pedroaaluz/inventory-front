export const translateMovementType = (
  movementType: string,
  language: "en" | "pt-br"
) => {
  if (language === "pt-br") {
    switch (movementType) {
      case "SALE":
        return "Venda";
      case "ADD_TO_STOCK":
        return "Adição ao Estoque";
      case "REMOVE_FROM_STOCK":
        return "Remoção do Estoque";
      default:
        return movementType;
    }
  } else {
    switch (movementType) {
      case "Venda":
        return "SALE";
      case "Adição ao Estoque":
        return "ADD_TO_STOCK";
      case "Remoção do Estoque":
        return "REMOVE_FROM_STOCK";
      default:
        return movementType;
    }
  }
};

export const translatePaymentMethod = (
  paymentMethod: string | null,
  language: "en" | "pt-br"
) => {
  console.log(paymentMethod);
  if (language === "pt-br") {
    switch (paymentMethod) {
      case "PIX":
      case "pix":
        return "PIX";
      case "DEBIT":
      case "debitCard":
        return "Débito";
      case "CREDIT":
      case "creditCard":
        return "Crédito";
      case "CASH":
      case "cash":
        return "Dinheiro";
      default:
        return "Sem método de pagamento";
    }
  } else {
    switch (paymentMethod) {
      case "PIX":
        return "PIX";
      case "Débito":
        return "DEBIT";
      case "Crédito":
        return "CREDIT";
      case "Dinheiro":
        return "CASH";
      default:
        return undefined;
    }
  }
};
