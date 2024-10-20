export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
}

export interface ICategoryListResponse {
  message: string;
  categories: ICategory[];
  status: number;
}
