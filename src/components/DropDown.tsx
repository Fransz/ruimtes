import React, { Key, useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

interface IDropDownItem {
  key: Key;
  value: unknown;
  label: React.JSX.Element;
}

interface IDropDown {
  items: IDropDownItem[];
  selected: IDropDownItem;
  setSelected: (i: IDropDownItem) => void;
}

const DropDown = ({ items, selected, setSelected }: IDropDown) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", clickHandler, { capture: true });

    return () =>
      window.removeEventListener("click", clickHandler, {
        capture: true,
      });
  }, []);

  const renderedItems = items.map((item: IDropDownItem) => (
    <div onClick={() => handleSelected(item)} key={item.key}>
      {item.label}
    </div>
  ));

  const handleSelected = (item: IDropDownItem) => {
    setIsOpen(false);
    setSelected(item);
  };

  const handleOpen = () => {
    setIsOpen((current) => {
      return !current;
    });
  };

  return (
    <div ref={ref} className='relative z-auto mr-auto bg-white text-black'>
      <div
        className='flex cursor-pointer items-center justify-between'
        onClick={() => handleOpen()}
      >
        {selected?.label || "Select...."}
        <GoChevronDown className='text-lg' />
      </div>
      {isOpen && (
        <div className='absolute top-full z-auto bg-white text-black'>
          {renderedItems}
        </div>
      )}
    </div>
  );
};

export { type IDropDownItem };
export default DropDown;
