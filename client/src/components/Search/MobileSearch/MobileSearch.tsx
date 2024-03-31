import { useState } from "react";
import { SearchResult } from "../SearchResults/SearchResults";
import search_icon from '../../../assets/icons/nav icons/mobile and desktop/search-svgrepo-com.svg'
import close_icon from '../../../assets/icons/nav icons/mobile/close-sm-svgrepo-com.svg'
import "./MobileSearch.css"

export const MobileSearch = () => {

  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [viewSearch, setViewSearch] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>("")

  function handleViewSearch() {
    console.log("view search")
    setOpenSearch(!openSearch);
    viewSearch ? setTimeout(function () {
      setViewSearch(!viewSearch);
    }, 200)
      : setViewSearch(!viewSearch);
  }

  const search_classes = (): string => {
    let classes = "";
    if (openSearch) {
      classes += ' open-mobile-menu'
      document.body.classList.add('none-scroll')
    } else {
      classes += ' close-mobile-menu'
      document.body.classList.remove('none-scroll')
    }
    return classes;
  }

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <button
        className="h-full"
        onClick={() => handleViewSearch()}
      >
        <img src={search_icon} className="h-full w-7 min-w-5 mr-2" />
      </button>

      <aside className={`fixed top-0 left-0 w-screen h-screen z-50 overflow-hidden md:left-0 -bg--color-white ${!viewSearch && " hidden"} ${search_classes()}`}>
        <header className='m-4 flex'>
          <form className="w-10/12 border-2 -border--color-very-light-grey rounded-xl grid grid-cols-5 gap-2 p-2">
            <input type="text" placeholder="Search for a Product..."
              className="rounded-full col-span-4 px-2"
              onChange={handleInputChange}
            />
            <button
              className="m-auto p-2 rounded-full bg-slate-100"
            // onClick={() => }
            >
              <img src={search_icon} className="w-5" />
            </button>
          </form>
          <button
            className=" m-auto mr-0"
            onClick={() => handleViewSearch()}
          >
            <img src={close_icon} className="" />
          </button>
        </header>
        <SearchResult input={searchInput} />
      </aside>
    </>
  )
}