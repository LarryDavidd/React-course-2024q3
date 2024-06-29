class UseLocalStorage {
  private static instance: UseLocalStorage;

  public static getInstance() {
    if (!UseLocalStorage.instance) {
      UseLocalStorage.instance = new UseLocalStorage();
    }
    return UseLocalStorage.instance;
  }

  set = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  load = <T>(key: string) => {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    const result = JSON.parse(item);
    return result as T;
  };

  remove = (key: string) => {
    localStorage.removeItem(key);
  };
}

export default UseLocalStorage;
