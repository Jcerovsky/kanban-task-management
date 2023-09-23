export const setLocalStorage = (data: any) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(data));
  }
};
