import React from 'react'
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import XIcon from '../assets/XIcon';
import MainSideBar from './MainSideBar';

const MobileFilters = (props) => {
  
const { mobileFiltersOpen, setMobileFiltersOpen} = props
    
  return (
<Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >                        
                        <XIcon className="h-6 w-6" />
                      </button>
                    </div>
                    <div className=" items-center  px-4">

                    <MainSideBar sort="brand" />
                    <MainSideBar sort="type" />
</div>
                  
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>  )
}

export default MobileFilters