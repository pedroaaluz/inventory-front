export const formatPhone = (phone: string): string => {
  phone = phone.replace(/\D/g, "");
  if (phone.length > 11) phone = phone.slice(0, 11); // Limite de 11 dígitos para telefone
  if (phone.length > 10) {
    return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }
  return phone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
};

export const formatCNPJ = (cnpj: string): string => {
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length > 14) cnpj = cnpj.slice(0, 14); // Limite de 14 dígitos para CNPJ
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};

export const formatCPF = (cpf: string): string => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length > 11) cpf = cpf.slice(0, 11); // Limite de 11 dígitos para CPF
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};
