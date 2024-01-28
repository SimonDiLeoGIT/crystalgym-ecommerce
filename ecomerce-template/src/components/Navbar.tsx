import { Link } from "react-router-dom"
import account_avatar from './../assets/nav icons/account-user-avatar.svg'
import instagram_icon from './../assets/nav icons/instagram.svg'
import bag_icon from './../assets/nav icons/bag-shopping.svg'
import search_icon from './../assets/nav icons/mobile and desktop/search-svgrepo-com.svg'
import menu from './../assets/nav icons/mobile/menu-svgrepo-com.svg'
import logo from './../assets/nav icons/mobile and desktop/amazon-svgrepo-com.svg'
import close_icon from './../assets/nav icons/mobile/close-sm-svgrepo-com.svg'
import { useState } from "react"

export const Navbar = () => {

  const [viewMenu, setViewMenu] = useState(false);
  const [searchMode, setSearchMode] = useState(false);

  const search_mode = () => {
    if (searchMode) {
      return (
        <section className="fixed w-screen h-screen top-0 left-0 bg-white">
          <form className="border-2 rounded-full col-span-4 ml-4">
            <button
              className="mx-4 align-middle h-full"
              onClick={() => setViewMenu(false)}
            >
              <img src={search_icon} className="w-4 h-full" />
            </button>
            <input type="text" placeholder="Search for a Product..."
              className="rounded-full py-4 w-4/5 focus:border-none"
            />
          </form>
        </section>
      )
    }
  }

  const menu_options = () => {
    if (viewMenu) {
      return (
        <section className="fixed w-screen h-screen top-0 left-0 bg-white">
          <section className="w-full grid grid-cols-5 py-4 border-b-2">
            <form className="border-2 rounded-full col-span-4 ml-4">
              <input type="text" placeholder="Search for a Product..."
                className="rounded-full py-4 w-4/5 focus:border-none"
              />
              <button
                className="mx-4 align-middle h-full"
                onClick={() => setViewMenu(false)}
              >
                <img src={search_icon} className="w-4 h-full" />
              </button>
            </form>
            <button
              className="m-auto mr-4"
              onClick={() => setViewMenu(false)}
            >
              <img src={close_icon} className="" />
            </button>
          </section>
          <section className="">
            <ul>
              <li className="p-4 border-b-2">
                <Link to="/" onClick={() => setViewMenu(false)}>HOME</Link>
              </li>
              <li className="p-4 border-b-2">
                <Link to="/women" onClick={() => setViewMenu(false)}>WOMEN</Link>
              </li>
              <li className="p-4 border-b-2">
                <Link to="/men" onClick={() => setViewMenu(false)}>MEN</Link>
              </li>
              <li className="p-4 border-b-2">
                <Link to="/accessories" onClick={() => setViewMenu(false)}>ACCESSORIES</Link>
              </li>
              <li className="p-4 border-b-2">
                <Link to="/accessories" onClick={() => setViewMenu(false)}>ACCOUNT</Link>
              </li>
              <li className="p-4 border-b-2">
                <Link to="/accessories" onClick={() => setViewMenu(false)}>CONTACT</Link>
              </li>
            </ul>
          </section>
        </section>
      )
    }
  }

  return (
    <nav className="grid grid-cols-3 border-2 min-h-16">
      <section className="m-auto ml-4 h-full">
        <button
          className="h-full"
          onClick={() => setViewMenu(true)}
        >
          <img src={menu} className="h-full w-8" />
        </button>
        {menu_options()}
      </section>
      <h1 className="m-auto h-full">
        <Link to='/'>
          <img src={logo} className="h-full w-8" />
        </Link>
      </h1>
      <ul className="w-full flex place-content-end">
        <li className="my-auto mx-6 h-full">
          <button onClick={() => setSearchMode(true)}>
            <img src={search_icon} className="h-full w-7" />
          </button>
        </li>
        <li className="my-auto mr-4 h-full">
          <Link to='/'>
            <img src={bag_icon} className="h-full w-8" />
          </Link>
        </li>
      </ul>
      {/*<h1 className="my-auto mx-4">
        <Link to="/">Home</Link>
      </h1>
      <ul className="w-full text-center py-6">
        <li className="inline hover:border-b-2 py-6">
          <Link to="/women">WOMEN</Link>
        </li>
        <li className="inline mx-4 hover:border-b-2 py-6">
          <Link to="/men">MEN</Link>
        </li>
        <li className="inline hover:border-b-2 py-6">
          <Link to="/accessories">ACCESSORIES</Link>
        </li>
      </ul>
      <ul className="w-full flex place-content-end">
        <li className="my-auto mr-4">
          <form>
            <input type="text" placeholder="Search for a Product..."
              className="border-2 rounded-full p-2"
            />
          </form>
        </li>
        <li className="my-auto">
          <Link to='/'>
            <img src={instagram_icon} />
          </Link>
        </li>
        <li className="my-auto mx-4">
          <Link to='/'>
            <img src={account_avatar} />
          </Link>
        </li>
        <li className="my-auto mr-4">
          <Link to='/'>
            <img src={bag_icon} />
          </Link>
        </li>
  </ul>*/}
    </nav>
  )
}