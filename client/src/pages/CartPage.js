import React, { useContext, useEffect } from "react";
import { Context } from "../index";
import { useState } from "react";
import { toJS } from "mobx";
import { useHttp } from "../hooks/httpHooks";
import { observer } from "mobx-react-lite";
import Cart from "../components/Cart";

const CartPage = observer(() => {
  const [products, setProducts] = useState([]);
  
  const { cart } = useContext(Context);
  const { request } = useHttp();
  const jsList = toJS(cart.list)

  useEffect(() => {
    async function fetchData() {
      const itemPromises = jsList.map((itemId) =>
        request(`/api/item/${itemId}`).then(response => response.itemFound)
      );
      const items = await Promise.all(itemPromises);
      setProducts([ ...items]);
    }
    fetchData();
    return () => {
      setProducts([]);
    };
  }, [ ]);

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <div className="">
        <Cart key={products.length} products={products}/>
      </div>
    </div>
  );
});

export default CartPage;
