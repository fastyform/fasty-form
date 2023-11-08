const createQueryString = (name: string, value: string, searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  return params.toString();
};

export default createQueryString;
