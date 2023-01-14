import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./dist/output.css";
import BrandStore from './store/BrandStore';
import CartSrore from './store/CartStore';
import ItemStore from './store/ItemStore';
import TypesStore from './store/TypeStore';
import UserStore from './store/UserStore';

export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Context.Provider value={{user: new UserStore(),
  item: new ItemStore(),
  brand: new BrandStore(),
  type: new TypesStore(),
  cart: new CartSrore()
  }}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Context.Provider>
);


