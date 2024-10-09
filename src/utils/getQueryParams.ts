export const getQueryParams = (params: string[], url: string) => {
  const { searchParams } = new URL(url);

  const query = params.reduce((acc, param) => {
    const value = searchParams.get(param);

    if (value) {
      acc[param] = value;
    }

    return acc;
  }, {} as Record<string, string>);
  return query;
};
