import { createContext, useEffect, useState } from "react";

export const context = createContext();
export const Provider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setIsLogin(false);

    console.log(isLogin);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);
  const value = {
    isLogin,
    setIsLogin,
    logout,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};
