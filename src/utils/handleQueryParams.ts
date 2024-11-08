import removeNulls from "./removeNulls";

export const handleQueryParams = (
  queryParams: Record<string, unknown>
): string => {
  const params = removeNulls(queryParams);

  return Object.keys(params)
    .map((key) => {
      return `${key}=${params[key]}`;
    })
    .join("&");
};
