const useLocalStorage = () => {
  const set = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const load = <T>(key: string) => {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    const result = JSON.parse(item);
    return result as T;
  };

  const remove = (key: string) => {
    localStorage.removeItem(key);
  };

  return { set, load, remove };
};

export default useLocalStorage;
