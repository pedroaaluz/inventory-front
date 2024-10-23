export type TListSuppliersParams = {
  userId: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  pageSize?: string;
  orderBy?: "asc" | "desc";
};

export interface Supplier {
  id: string;
  name: string;
  nameNormalized: string;
  userId: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  cnpj: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type TListSuppliersResponse = {
  message: string;
  page: number;
  pageSize: number;
  totalSuppliers: number;
  totalPages: number;
  suppliers: Supplier[];
};

export interface IGetSupplierResponse {
  supplier: Supplier;
  message: string;
  status: number;
}

export interface IUpdateSupplierResponse {
  message: string;
  status: number;
  supplier: Supplier;
}

export type TCreateSupplierResponse = IUpdateSupplierResponse;
