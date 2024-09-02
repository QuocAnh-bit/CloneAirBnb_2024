export const transformString = (Oj) => {
  const params = new URLSearchParams(Oj);
  return params.toString();
};
export const transformObject = (str) => {
  const params = new URLSearchParams(str);
  const obj = {};
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }
  return obj;
};
