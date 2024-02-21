import { useState } from "react";

interface propsType {
  setSearchMode(state: boolean): void,
  search_icon: string,
  close_icon: string,
}

export const SearchMobile: React.FC<propsType> = ({ setSearchMode, search_icon, close_icon }) => {

  const [closeSearchMode, setCloseSearchMode] = useState(false);

  function handleViewSearch() {
    setCloseSearchMode(true);
    setTimeout(function () {
      setSearchMode(false);
    }, 400);
  }

  const search_classes = (): string => {
    let classes = " fixed w-screen h-screen top-0 left-0 -bg--color-white z-10";
    !closeSearchMode ? (classes += ' open-mobile-menu') : (classes += ' close-mobile-menu');
    return classes;
  }

  return (
    <section className={search_classes()}>
      <section className="w-full grid grid-cols-5 p-2  border-b -border--color-very-light-grey">
        <form className=" border-2 -border--color-very-light-grey rounded-full col-span-4 grid grid-cols-5 gap-2 p-2">
          <input type="text" placeholder="Search for a Product..."
            className="rounded-full col-span-4 px-2"
          />
          <button
            className="m-auto p-2 rounded-full bg-slate-100"
            onClick={() => setSearchMode(false)}
          >
            <img src={search_icon} className="w-5" />
          </button>
        </form>
        <button
          className="ml-auto"
          onClick={() => handleViewSearch()}
        >
          <img src={close_icon} className="" />
        </button>
      </section>
    </section>
  )
}