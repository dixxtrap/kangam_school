import { useEffect, useState } from "react";
const getSavedValue = (key, initialValue) => {
  const test = sessionStorage.getItem(key);

  if (test !== "") {
    const savedValue = JSON.parse(test);
    return savedValue;
  }
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

const useSessionStororage = (key, initialValue) => {
  const [value, set] = useState(() => {
    return getSavedValue(key, initialValue);
  });
  const setValue = (va) => {
    return new Promise((resolve, reject) => {
      set(va);
      resolve("sucess");
    });
  };
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

export { useSessionStororage };
