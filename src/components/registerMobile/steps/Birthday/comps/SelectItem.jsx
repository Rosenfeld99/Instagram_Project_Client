import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectItem({ render_ar, setBirthday, type, birthday }) {
  const [selected, setSelected] = useState(render_ar[0]);
  console.log(birthday);

  return (
    <Listbox
      value={birthday[type]}
      onChange={(value) => {
        setBirthday({ ...birthday, [type]: value }), setSelected(value, type);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative mt-2 text-[12px] ">
            <Listbox.Button className="relative w-full cursor-default rounded bg-white py-1.5 pl-1 pr-10 text-left text-txt_all_small shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-category_bio sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-txt_all_small"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-[11px]">
                {render_ar.map((item, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-white bg-btn_follow opacity-50"
                          : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-1 "
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center text-[12px] font-semibold">
                          <span
                            className={classNames(
                              selected
                                ? "font-semibold text-white"
                                : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {item.name}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
