const setItem = (key: string | undefined, data: any) => {
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(data));
};
const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
const getItem = (key: string | undefined) => {
  if (!key) return;
  let data;
  data = localStorage.getItem(key);
  return data;
};
export { setItem, getItem, removeItem };
