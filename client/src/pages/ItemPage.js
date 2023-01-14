import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import { useHttp } from "../hooks/httpHooks";
import { CART_ROUTE } from "../utils/const";

const ItemPage = observer(() => {
  const [item, setItem] = useState(null);
  const [isInCart, setIsInCart] = useState();

  const { cart } = useContext(Context);

  const { id } = useParams();
  const { request, loading } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    request(`/api/item/${id}`).then((response) => {
      setItem(response.itemFound);
      setIsInCart(toJS(cart.list).includes(Number(id)));
    });
  }, [cart.list.length]);


  const addItemHandler = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    request(
      "/api/cart",
      "POST",
      { itemId: id },
      {
        Authorization: `Bearer ${token}`,
      }
    ).then(() => {
      cart.addCartItem(Number(id));
      setIsInCart(() => true);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="w-16 h-16 border-4 border-sky-800 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    item && (
      <div className="bg-white">
        <div className="pt-6">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={process.env.REACT_APP_SERVER_URL + "/" + item.img}
                alt={item.name + "picture"}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-4 sm:overflow-hidden overflow-hidden rounded-lg lg:block px-5">
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Description
                </h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {item.item_characteristics.map((characteristic) => (
                      <li key={characteristic.id} className="text-gray-400">
                        <span className="text-gray-600">
                          {characteristic.title}: {characteristic.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div key={isInCart} className="mt-4 lg:row-span-3 lg:mt-0 px-5">
              <p className="text-3xl tracking-tight text-gray-900">
                {item.price + "$"}
              </p>
              {isInCart ? (
                <button
                  type="button"
                  onClick={() => {
                    navigate(CART_ROUTE);
                  }}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 py-3 px-8 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Go to cart
                </button>
              ) : (
                <button
                  type="button"
                  onClick={addItemHandler}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 py-3 px-8 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
});

export default ItemPage;
