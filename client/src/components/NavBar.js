import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/const";
import logo from "../assets/AzazoneLogo-2.png";
import XIcon from "../assets/XIcon";
import BurgerIcon from "../assets/BurgerIcon";
import CartIcon from "../assets/CartIcon";
import { useAuth } from "../hooks/authHook";
import { useHttp } from "../hooks/httpHooks";

const token = JSON.parse(localStorage.getItem("token"));
const NavBar = observer((props) => {
  const { cart, user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const {logout} = useAuth()

  const { request } = useHttp();

  useEffect(() => { 
   if (user.isAuth) { 
    request("/api/cart", "GET", null, {
      Authorization: `Bearer ${token}`,
    }).then((response) => {
        cart.setList(response.items.map((item) => item.itemId));
    });}
   },[])

  const navigation = [
        {
          name: "Main",
          href: `${SHOP_ROUTE}`,
        },
     
      ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white ">
                  {open ? <XIcon /> : <BurgerIcon />}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center pl-12 sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* Logo */}
                  <NavLink to={SHOP_ROUTE} className=" block ">
                    <img className="h-8 w-auto" src={logo} alt="logo" />
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.href === location.pathname
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white "
                  onClick={()=>navigate('/cart')} 
                >
                  <span className="sr-only">View notifications</span>
                  <CartIcon/>
                </button>


                {/* Profile dropdown */}
                {user.isAuth ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm ">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 ">
                        {user.user.role === "ADMIN" && (
                          <Menu.Item>
                            {({ active }) => (
                              <li
                                onClick={() => navigate(`${ADMIN_ROUTE}`)}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                                )}
                              >
                                Manage content
                              </li>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            
                            <a
                              href="/login"
                              onClick={() => {
                                logout()
                              }}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div>
                    <NavLink to={LOGIN_ROUTE} className={classNames(
                          location.pathname === LOGIN_ROUTE
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}>
                        Log in
                      </NavLink>
                      <NavLink to={REGISTRATION_ROUTE} className={classNames(
                          location.pathname === REGISTRATION_ROUTE
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}>
                        Sign up
                      </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === location.pathname
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
});

export default NavBar;
