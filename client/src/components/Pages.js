import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "..";
import SingleChevronIcon from "../assets/SingleChevronIcon";

const Pages = observer(() => {
  const { item } = useContext(Context);
  const pagesQty = Math.ceil(item.totalPages / item.limit);
  const pageNumbers = [];

  for (let i = 0; i < pagesQty; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <>
      <div className="py-3 flex">
        {/* button back */}
        <NavLink
          href="#"
          onClick={() => {
            item.setCurrentPage(
              item.currentPage > 1 ? item.currentPage - 1 : item.currentPage
            );
          }}
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <SingleChevronIcon className="h-5 w-5" />
        </NavLink>

        {/* pages buttons  */}
        {pageNumbers.map((p) => (
          <NavLink
            key={p}
            to={"#"}
            onClick={() => {
              item.setCurrentPage(p);
            }}
            className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 ${
              item.currentPage === p
                ? "bg-sky-50 border-sky-500 text-sky-600"
                : "border-gray-300 bg-white text-gray-500"
            }`}
          >
            {p}
          </NavLink>
        ))}

        {/* button forth */}
        <NavLink
          href="#"
          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          onClick={() => {
            item.setCurrentPage(
              item.currentPage < pagesQty
                ? item.currentPage + 1
                : item.currentPage
            );
          }}
        >
          <SingleChevronIcon className="h-5 w-5 rotate-180" />
        </NavLink>
      </div>
    </>
  );
});

export default Pages;
