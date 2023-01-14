import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, publicRoutes, restrictedRoutes } from "../routes";
import { Context } from "../index";
import { SHOP_ROUTE } from "../utils/const";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const {user} = useContext(Context)
  return (
    <Routes>
      {user.isAuth &&
        restrictedRoutes.map((r) => {
          const { path, component } = r;
          return <Route key={path} path={path} element={component} />;
        })}
      {user.isAuth && user.user.role === 'ADMIN' &&
        adminRoutes.map((r) => {
          const { path, component } = r;
          return <Route key={path} path={path} element={component} />;
        })}
        
      {publicRoutes.map((r) => {
        const { path, component } = r;
        return <Route key={path} path={path} element={component} />;
      })}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} /> 
    </Routes>
  );
});

export default AppRouter;
