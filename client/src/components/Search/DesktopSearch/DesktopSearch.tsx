import { useState } from "react";
import { SearchResult } from "../SearchResults/SearchResults";
import search_icon from '../../../assets/icons/nav icons/mobile and desktop/search-svgrepo-com.svg'
import close_icon from '../../../assets/icons/nav icons/mobile/close-sm-svgrepo-com.svg'
import "./../SearchStyles.css"

export const DesktopSearch = () => {

  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [viewSearch, setViewSearch] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>("")

  function handleViewSearch(inputText: string) {
    inputText === '' ? setOpenSearch(false) : setOpenSearch(true)
    inputText === '' ? setTimeout(function () {
      setViewSearch(false);
    }, 200)
      : setViewSearch(true);
  }

  const search_classes = (): string => {
    let classes = "";
    if (openSearch) {
      classes += ' open-menu'
      document.body.classList.add('none-scroll')
    } else {
      classes += ' close-menu'
      document.body.classList.remove('none-scroll')
    }
    return classes;
  }

  function handleInputChange(text: string) {
    setSearchInput(text)
    handleViewSearch(text)
  }

  function handleSearchButtonClick() {
    searchInput !== '' && handleInputChange('')
  }

  return (
    <>
      <form className="border-2 rounded-lg h-12 max-w-56 -border--color-very-light-grey flex items-center hover:cursor-pointer hover:opacity-60">
        <input type="text" placeholder="Search for a Product..."
          className="rounded-lg h-full w-full p-2 outline-none hover:cursor-pointer"
          onChange={e => handleInputChange(e.target.value)}
        />
        <button
          className="p-2 mx-1 rounded-full"
          onClick={() => handleSearchButtonClick()}
        >
          <img src={searchInput === '' ? search_icon : close_icon} className="" />
        </button>
      </form>

      <aside className={`fixed top-20 left-0 w-screen bottom-0 z-10 opacity-animation ${!viewSearch && " hidden"}`}>
        <section
          className={`max-w-xl py-2 m-auto mr-0 -bg--color-white h-full ${search_classes()}`}
          onClick={() => handleViewSearch('')}
        >
          <SearchResult input={searchInput} />
        </section>
      </aside>
    </>
  )
}