import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import ChevronUpDownIcon from "../../../assets/ChevronUpDownIcon";
import CheckIcon from "../../../assets/CheckIcon";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";


export const ComboBox = observer((props) => {
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState("");

  const {handleInputChange, name, model} = props

  const filtredList =
    query === ""
      ? toJS(model.list)
      : toJS(model.list).filter((i) =>
          i.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="col-span-10 sm:col-span-5" >
      <Combobox
        as="div"
        className="col-span-10 sm:col-span-5"
        name={props.model.className}
        value={selected}
        onChange={ (e) => { handleInputChange({target: {name: name, value: e.id}}); setSelected(e) } }
      >
        <p className="block mt-1 text-sm font-medium text-gray-700">
          Select {props.name}
        </p>
        <div className="relative">
          <Combobox.Input
            className="my-1  w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 text-sm"
            displayValue={(i) => i.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='--select--'
            required
            />

          <Combobox.Button className="absolute right-0 items-center inset-y-0 pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400 "
              />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
          >
          <div className="relative">
            <Combobox.Options className='absolute mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"'>
              {filtredList.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filtredList.map((i) => (
                  
                  <Combobox.Option
                  key={i.id}
                  className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-sky-600 text-white" : "text-gray-900"
                  }`
                }
                value={i}
                >
                    {({ selected, active }) => (
                      <div key={i.id}
                      >
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {i.name}
                        </span>
                        {/* CheckIcon */}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-sky-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Transition>
      </Combobox>
    </div>
  );
})
