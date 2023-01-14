import React, { useState } from "react";
import XIcon from "../../../assets/XIcon";

const Characteristics = (props) => {
  const [characteristics, setCharacteristics] = useState([]);

  const { handleInputChange } = props;

  const addCharacteristic = (title, description, id = Date.now()) => {
    setCharacteristics([...characteristics, { title, description, id }]);
  };

  const removeCharacteistic = (id) => {
    setCharacteristics(characteristics.filter((c) => c.id !== id));
  };

  const handleInputCherecteristic = (key, value, id) => {
    // It changes value of the id object property which name is equal to input key
    const updatedList = characteristics.map((char) =>
      char.id === id ? { ...char, [key]: value } : char
    );
    setCharacteristics(updatedList);
    handleInputChange({
      target: { name: "characteristics", value: updatedList },
    });
  };

  return (
    <div className="col-span-10 w-full ">
      {characteristics.map((c) => (
        <div
          key={c.id}
          className="grid grid-cols-9 mt-4 grid-rows-2 sm:grid-rows-1"
        >
          <div className="col-span-8 grid-row-1 sm:col-span-4 pr-4">
            <label
              htmlFor={c.id}
              className="block text-sm mt-1 font-medium text-gray-700"
            >
              title
            </label>
            <input
              required
              type="text"
              name="title"
              id={c.id}
              value={c.title}
              onChange={(e) => {
                handleInputCherecteristic(e.target.name, e.target.value, c.id);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
            />
          </div>
          <div className="col-span-8 grid-row-2 sm:col-span-4 pr-4">
            <label
              htmlFor={c.id}
              className="block text-sm mt-1 font-medium text-gray-700"
            >
              description
            </label>
            <input
              required
              type="text"
              name="description"
              id={c.id}
              value={c.description}
              onChange={(e) => {
                handleInputCherecteristic(e.target.name, e.target.value, c.id);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
            />
          </div>
          <div className="col-start-9    row-span-full  h-full w-full pt-7">
            <button
              type="button"
              className="flex flex-col mx-auto justify-center items-center rounded-md h-full w-full border border-transparent bg-gray-100 text-sm font-medium text-gray-700 hover:bg-blue-200 "
              onClick={() => removeCharacteistic(c.id)}
            >
              <XIcon />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="col-span-10 mt-2 w-full rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-blue-200 "
        onClick={(e) => {
          addCharacteristic("", "");
        }}
      >
        Add characteristic
      </button>
    </div>
  );
};

export default Characteristics;
