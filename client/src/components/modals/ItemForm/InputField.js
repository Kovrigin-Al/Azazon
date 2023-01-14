import React from "react";

const InputField = (props) => {
  const { size, name, type, handleInputChange, form } = props;

  return (
    <div className={size}>
      <label
        htmlFor={"item-" + { name }}
        className="block text-sm font-medium text-gray-700"
      >
        Item {name}
      </label>
      <input
        required
        type={type}
        name={ name }
        id= { name }
        onChange={handleInputChange}
        value={form[type]}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
      />
    </div>
  );
};

export default InputField;
