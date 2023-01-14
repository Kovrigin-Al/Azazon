import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "..";
import XIcon from "../assets/XIcon";
import { useHttp } from "../hooks/httpHooks";

const Cart = observer((props) => {
  const [products, setProducts] = useState(props.products);

  const { request } = useHttp();
  const { cart } = useContext(Context);

  const handleDelete = (itemId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    request(
      `/api/cart/`,
      "DELETE",
      { itemId },
      {
        Authorization: `Bearer ${token}`,
      }
    ).then(() => {
      cart.removeItem(Number(itemId));
      const newState = products.filter((i) => i.id !== Number(itemId))
      setProducts(newState);
    });
  };

  return (
    <div className="grid grid-cols-6 gap-2 md:px-20 my-10">
      {products.length>0 ? (
        <>
           {products.map((p) => (
            <Fragment key={p.id}>
              <div className="col-span-4 my-auto px-2">{p.name}</div>
              <div className="col-span-1 m-auto">{p.price + "$"}</div>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-4 py-1 m-auto text-sm text-sky-600 font-semibold rounded-full border border-sky-200 hover:text-white hover:bg-sky-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 col-span-1"
              >
                <XIcon />
              </button>
            </Fragment>
          ))}
          <button
            onClick={() =>
              alert("This feature will be implemented in the next release")
            }
            className="col-start-3 col-end-5 px-4 py-1 my-auto mt-3 text-sm hover:text-sky-600 font-semibold rounded-full border  text-white hover:bg-white bg-sky-600 hover:border-sky-600  "
          >
            {"Order now"}
          </button>
        </>
      ) : (
        <h4 className="col-start-3 col-end-5 m-auto text-sky-600">Your cart is empty...</h4>
      )}
      <Link
        to="/"
        className="col-start-3 col-end-5 m-auto text-xs text-sky-800"
      >
        Go back to shopping
      </Link>
    </div>
  );
});

export default Cart;
