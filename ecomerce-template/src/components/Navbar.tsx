import { Link } from "react-router-dom"
import account_avatar from './../assets/nav icons/account-user-avatar.svg'
import instagram_icon from './../assets/nav icons/instagram.svg'
import bag_icon from './../assets/nav icons/bag-shopping.svg'
import search_icon from './../assets/nav icons/mobile and desktop/search-svgrepo-com.svg'
import menu from './../assets/nav icons/mobile/menu-svgrepo-com.svg'
import logo from './../assets/nav icons/mobile and desktop/amazon-svgrepo-com.svg'
import close_icon from './../assets/nav icons/mobile/close-sm-svgrepo-com.svg'
import { useState } from "react"
import { MobileMenu } from "./MobileMenu"
import { Search_Mobile } from "./Search_Mobile"
import { Input } from "@nextui-org/react";

export const Navbar = () => {

  const [viewMenu, setViewMenu] = useState(false);
  const [searchMode, setSearchMode] = useState(false);

  const search_mode = () => {
    if (searchMode) {
      return (
        <Search_Mobile setSearchMode={setSearchMode} search_icon={search_icon} close_icon={close_icon} />
      )
    }
  }

  const menu_options = () => {
    if (viewMenu) {
      return (
        <MobileMenu setViewMenu={setViewMenu} close_icon={close_icon} logo={logo} />
      )
    }
  }

  return (
    <nav className="grid grid-cols-3 border-2 min-h-16">
      <section className="m-auto ml-4 h-full lg:hidden">
        <button
          className="h-full"
          onClick={() => setViewMenu(true)}
        >
          <img src={menu} className="h-full w-8" />
        </button>
        {menu_options()}
      </section>
      <h1 className="m-auto h-full lg:ml-0 lg:px-4">
        <Link to='/' className=" border-2">
          <img src={logo} className="h-full w-8" />
        </Link>
      </h1>
      <ul className="invisible fixed w-full text-center py-6 lg:visible lg:relative">
        <li className="inline hover:border-b-2 px-4 py-6 hover:cursor-pointer font-semibold">
          <Link to="/women">WOMEN</Link>
        </li>
        <li className="inline px-8 hover:border-b-2 py-6 hover:cursor-pointer font-semibold">
          <Link to="/men">MEN</Link>
        </li>
        <li className="inline hover:border-b-2 px-4 py-6 hover:cursor-pointer font-semibold">
          <Link to="/accessories" className="h-full">ACCESSORIES</Link>
        </li>
      </ul>
      <ul className="w-full flex place-content-end">
        <li className="invisible fixed my-auto mr-4 h-full grid place-content-center lg:visible lg:relative">
          <form className="border-2 rounded-full col-span-4 grid grid-cols-5 gap-2 px-2">
            <input type="text" placeholder="Search for a Product..."
              className="rounded-full col-span-4 p-4 outline-none hover:cursor-pointer"
            />
            <button
              className="m-auto p-2 rounded-full bg-slate-100"
              onClick={() => setSearchMode(false)}
            >
              <img src={search_icon} className="w-5" />
            </button>
          </form>
        </li>
        <li className="invisible fixed my-auto mr-4 h-full lg:visible lg:relative">
          <Link to='/'>
            <img src={instagram_icon} className="h-full w-10" />
          </Link>
        </li>
        <li className="invisible fixed my-auto mr-4 h-full lg:visible lg:relative">
          <Link to='/'>
            <img src={account_avatar} className="h-full w-7" />
          </Link>
        </li>
        <li className="my-auto mx-6 h-full lg:hidden">
          <section className="h-full">
            <button onClick={() => setSearchMode(true)} className="h-full">
              <img src={search_icon} className="h-full w-7" />
            </button>
            {search_mode()}
          </section>
        </li>
        <li className="my-auto mr-4 h-full">
          <Link to='/'>
            <img src={bag_icon} className="h-full w-8" />
          </Link>
        </li>
      </ul>
      {/*
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