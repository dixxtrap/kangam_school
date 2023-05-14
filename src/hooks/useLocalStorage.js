import { useEffect, useState } from "react";
const getSavedValue = (key, initialValue) => {
  const test = localStorage.getItem(key);
  console.log("test");
  console.log(test);
  if (test !== "") {
    console.log("test true");
    const savedValue = JSON.parse(test);
    return savedValue;
  }
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

const useLocalStororage = (key, initialValue) => {
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
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
};

export { useLocalStororage };
