import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import ShopPage from "./pages/ShopPage";
import ItemPage from "./pages/ItemPage";
import { ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ITEM_ROUTE} from "./utils/const";

export const restrictedRoutes = [
  
  { path: CART_ROUTE, component: <CartPage/> },
];

export const adminRoutes = [
  { path: ADMIN_ROUTE, component: <AdminPage/> },
]

export const publicRoutes = [
  { path: LOGIN_ROUTE, component: <AuthPage/> },

  { path: REGISTRATION_ROUTE, component: <AuthPage/> },

  { path: SHOP_ROUTE, component: <ShopPage/> },

  { path: ITEM_ROUTE+'/:id', component: <ItemPage/> },
];
