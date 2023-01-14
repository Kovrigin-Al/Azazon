import { useCallback, useContext } from "react";
import { Context } from "../index";
import jwt_decode from "jwt-decode";

export const useAuth = () => {
  const { user } = useContext(Context);

  const login = useCallback(
    (jwtToken) => {
      user.setUser(jwt_decode(jwtToken));
      user.setIsAuth(true);
      localStorage.setItem("token", JSON.stringify(jwtToken));
    },
    [user]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    user.setIsAuth(false);
    user.setUser({});
  }, [user]);

  return { login, logout };
};
