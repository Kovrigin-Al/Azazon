import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useState, useEffect } from "react";
import { useHttp } from "../../hooks/httpHooks";
import { Context } from "../../index";
import Characteristics from "./ItemForm/Characteristics";
import { ComboBox } from "./ItemForm/ComboBox";
import InputField from "./ItemForm/InputField";
import UploadBlock from "./ItemForm/UploadBlock";

export default function CreateItemModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({});

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fileInput = React.createRef();

  const { brand, type } = useContext(Context);
  const { request } = useHttp();
  useEffect(() => {
    request("/api/type").then((response) => type.setTypes(response.types));
    request("/api/brand").then((response) => brand.setBrands(response.brands));
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = (f) => {
    f.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", `${form.price}`);
    formData.append("brandId", form.brand);
    formData.append("typeId", form.type);
    formData.append(
      "item_characteristics",
      JSON.stringify(form.characteristics)
    );
    formData.append("img", fileInput.current.files[0]);

    const token = JSON.parse(localStorage.getItem("token"));
    request("/api/item", "POST", formData, {
      Authorization: `Bearer ${token}`,
    }).then(() => {
      closeModal();
    });
  };

  return (
    <>
      <div className="py-2 mt-10 inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-sky-800 w-1/4 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-40 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create item
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mt-20 w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new item
                  </Dialog.Title>

                  <div className="mt-5 md:col-span-2 ">
                    <form onSubmit={handleSubmit}>
                      {/* fields */}
                      <div className="grid grid-cols-10 gap-4">
                        {/* set name */}
                        <InputField
                          size="col-span-10"
                          name="name"
                          type="text"
                          handleInputChange={handleInputChange}
                          form={form}
                        />
                        {/* set price */}
                        <InputField
                          size="col-span-10"
                          name="price"
                          type="number"
                          handleInputChange={handleInputChange}
                          form={form}
                        />
                        {/* set brand */}
                        <ComboBox
                          model={brand}
                          name="brand"
                          handleInputChange={handleInputChange}
                          form={form}
                          setForm={setForm}
                        />
                        {/* set type */}
                        <ComboBox
                          model={type}
                          name="type"
                          handleInputChange={handleInputChange}
                          form={form}
                          setForm={setForm}
                        />
                        <Characteristics
                          handleInputChange={handleInputChange}
                          form={form}
                        />

                        {/* Upload image */}
                        <UploadBlock
                          fileInput={fileInput}
                          handleInputChange={handleInputChange}
                          form={form}
                        />
                      </div>

                      {/* buttons */}
                      <div className=" px-0 py-3 text-right ">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 mx-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 "
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-blue-200 "
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
