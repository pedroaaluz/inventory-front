export interface IResponsiveTableProps {
  isLoading: boolean;
  isFetching: boolean;
  data: { [key: string]: any; rowAction?: (params?: unknown) => void }[];
  columns: { name: string; objectKey: string; hasImage?: boolean }[];
  columnsShowInResponsive: {
    mainColumn: {
      name: string;
      objectKey: string;
      hasImage?: boolean;
    };
    secondaryColumn: {
      name: string;
      objectKey: string;
      hasImage?: boolean;
    }[];
  };
  totalPages: number;
  page: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  isMobile: boolean;
  height?: number;
}
