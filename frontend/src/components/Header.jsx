import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const url = useLocation();

  const activeStyle =
    "inline-flex items-center bg-white text-blue-600 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0";
  const inActiveStyle =
    "inline-flex items-center bg-blue-600 text-white py-1 px-3 focus:outline-none hover:bg-white hover:text-blue-600 rounded text-base mt-4 md:mt-0";

  return (
    <header className="text-gray-600 body-font bg-blue-600">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-2xl text-white">
            Task Management Application
          </span>
        </a>
        <div className="flex w-screen justify-end gap-5">
          <Link
            to={"/signin"}
            className={url.pathname === "/signin" ? activeStyle : inActiveStyle}
          >
            Login
          </Link>
          <Link
            to={"signup"}
            className={url.pathname === "/signup" ? activeStyle : inActiveStyle}
          >
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
