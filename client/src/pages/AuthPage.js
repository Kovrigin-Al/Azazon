import React, { useState } from "react";
import { useHttp } from "../hooks/httpHooks";
import { observer } from "mobx-react-lite";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/const";
import { useAuth } from "../hooks/authHook";


const AuthPage = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { loading, request, error, cleanError } = useHttp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    cleanError();
    try {
      const response = await request(
        location.pathname === LOGIN_ROUTE
          ? "/api/user/login"
          : "/api/user/registration",
        "POST",
        {
          email,
          password,
        }
      );
      login(response.token);
      navigate(`${SHOP_ROUTE}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* header */}
        <div>
          {location.pathname === LOGIN_ROUTE ? (
            <>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Log in to your account
              </h2>
              <p className="mt-2 text-center my-10 text-sm text-gray-600">
                You are not registred yet?{" "}
                <NavLink className="text-sky-600" to={REGISTRATION_ROUTE}>
                  {" "}
                  Create account{" "}
                </NavLink>
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Create account
              </h2>
              <p className="mt-2 text-center my-10 text-sm text-gray-600">
                Have you already registred?{" "}
                <NavLink className="text-sky-600" to={LOGIN_ROUTE}>
                  {" "}
                  Sign in{" "}
                </NavLink>
              </p>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className={
                  error
                    ? "relative block w-full appearance-none rounded-none rounded-t-md border border-red-300 px-3 py-2 text-red-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    : "relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                }
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={
                  error
                    ? "relative block w-full appearance-none rounded-none rounded-b-md border border-red-300 px-3 py-2 text-red-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    : "relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                }
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {error ? (
              <p className="absolute text-red-400 text-xs z-30">{error}</p>
            ) : (
              <></>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className={
              loading
                ? "group relative flex w-full justify-center  rounded-md border border-transparent bg-gray-400 py-2 text-sm font-medium text-white"
                : "group relative flex w-full justify-center  rounded-md border border-transparent bg-sky-600 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            }
          >
            {location.pathname === LOGIN_ROUTE ? "Log in" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
});

export default AuthPage;
