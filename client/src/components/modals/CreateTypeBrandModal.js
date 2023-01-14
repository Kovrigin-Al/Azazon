import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useHttp } from "../../hooks/httpHooks";

export default function CreateTypeBrandModal(props) {
  let [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const { request } = useHttp();

  const submitType = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await request(
      "/api/type",
      "POST",
      { name: value },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response[modalTitle]) {
      alert(
        `New type was created: title - ${JSON.stringify(
          response[modalTitle].name
        )}, id - ${JSON.stringify(response[modalTitle].id)}`
      );
      closeModal()
    }
  };

  const submitBrand = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await request(
      "/api/brand",
      "POST",
      { name: value },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response[modalTitle]) {
      alert(
        `New brand was created: title - ${JSON.stringify(
          response[modalTitle].name
        )}, id - ${JSON.stringify(response[modalTitle].id)}`
      );
      closeModal()
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { modalTitle, modalType } = props;

  return (
    <>
      <div className="py-2 mt-10 inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-sky-800 w-1/4 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-40 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create {modalTitle}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new {modalTitle}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="mt-5 md:col-span-2 md:mt-0">
                      <div>
                        {/* fields */}
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6">
                            <label
                              htmlFor={modalTitle}
                              className="block text-sm font-medium text-gray-700"
                            >
                              {modalTitle} name
                            </label>
                            <input
                              required
                              type={modalType}
                              name={modalTitle}
                              onChange={(e) => {
                                setValue(e.target.value);
                              }}
                              id={modalTitle}
                              autoComplete={modalTitle}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        {/* buttons */}
                        <div className=" px-0 py-3 text-right ">
                          <button
                            type="submit"
                            onClick={
                              modalTitle === "type" ? submitType : submitBrand
                            }
                            className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 mx-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 "
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 "
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
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
