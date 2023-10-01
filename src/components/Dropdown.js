import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

function Dropdown({ items, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const clickHandler = (e) => {
      if (!ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", clickHandler, { capture: true });

    return () =>
      window.removeEventListener("click", clickHandler, {
        capture: true,
      });
  }, []);

  const renderedItems = items.map((item) => {
    return (
      <div onClick={() => handleSelected(item)} key={item.value}>
        {item.content}
      </div>
    );
  });

  const handleSelected = (item) => {
    setIsOpen(false);
    setSelected(item);
  };

  const handleOpen = () => {
    setIsOpen((current) => {
      return !current;
    });
  };

  return (
    <div ref={ref} className='relative z-auto bg-white text-black'>
      <div
        className='flex cursor-pointer items-center justify-between'
        onClick={(e) => handleOpen()}
      >
        {selected?.content || "Select...."}
        <GoChevronDown className='text-lg' />
      </div>
      {isOpen && (
        <div className='absolute top-full z-auto bg-white text-black'>
          {renderedItems}
        </div>
      )}
    </div>
  );
}
export default Dropdown;
