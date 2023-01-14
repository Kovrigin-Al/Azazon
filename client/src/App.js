import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useAuth } from "./hooks/authHook";
import { useHttp } from "./hooks/httpHooks";

const token = JSON.parse(localStorage.getItem("token"));
const App = observer(() => {
  const [loading, setLoading] = useState(true);

  const { login } = useAuth();
  const { request } = useHttp();
  const { cart } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const getItemsIds = request("/api/cart", "GET", null, {
        Authorization: `Bearer ${token}`,
      }).then((response) => {
        cart.setList(response.items.map((item) => item.itemId));
      });
      const checkTocken = request("/api/user/auth", "GET", null, {
        Authorization: `Bearer ${token}`,
      }).then((response) => {
        if (response.token) {
          login(response.token);
        }
      });

      Promise.all([getItemsIds, checkTocken]).finally(() => {
        setLoading(false);
      });
    }
    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
    return () => {
      setLoading(true);
    };
  }, [cart, login, request]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="w-16 h-16 border-4 border-sky-800 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
