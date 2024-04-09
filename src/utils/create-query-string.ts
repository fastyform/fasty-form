type Param = { name: string; value: string; action: 'add' } | { name: string; action: 'delete' };

const createQueryString = (paramsArray: Param[], searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams);
  paramsArray.forEach((param) => {
    if (param.action === 'add') {
      params.set(param.name, param.value);
    }
    if (param.action === 'delete') {
      params.delete(param.name);
    }
  });

  return params.toString();
};

export default createQueryString;
