import React, { useContext, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import PlusIcon from "../assets/PlusIcon";
import XIcon from "../assets/XIcon";

const MainSideBar = observer((props) => {
  const context = useContext(Context);
  const sort = context[props.sort];
  
  const [selectedId, setSelectedId] = useState(sort.selected);

  useEffect(() => {
    sort.setSelected( selectedId)
  }, [selectedId, sort])
  
  return (
    <Disclosure sort={sort} as="div" className="border-b border-gray-200 py-6">
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">
                {sort.className}
              </span>
              <span className="ml-6 flex items-center">
                {open ? <XIcon /> : <PlusIcon />}
              </span>
            </Disclosure.Button>
          </h3>

          <Disclosure.Panel as="ul" className="pt-6 space-y-4">
            <li
              key={sort.className}
              onClick={() => {
                setSelectedId(0);
              }}
              className={`${
                selectedId === 0 ? "font-medium text-gray-900" : "text-gray-500"
              } hover:bg-gray-100 hover:cursor-pointer block px-4 py-2 text-sm w-full`}
            >
              All
            </li>
            {sort.list.map((t) => {
              return (
                <li
                  key={t.id+1}
                  onClick={() => {
                    setSelectedId(selectedId === t.id ? 0 : t.id);
                  }}
                  className={`${
                    t.id === selectedId
                      ? "font-medium text-gray-900"
                      : "text-gray-500"
                  } hover:bg-gray-100 hover:cursor-pointer block px-4 py-2 text-sm w-full`}
                >
                  {t.name}
                </li>
              );
            })}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
});

export default MainSideBar;
