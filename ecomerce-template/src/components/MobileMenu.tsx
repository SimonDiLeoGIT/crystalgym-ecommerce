import { Link } from "react-router-dom"
import './../styles/mobile-menu.css'
import { useState } from "react"

interface propsType {
  setViewMenu(state: boolean): void,
  close_icon: string,
  logo: string,
}

export const MobileMenu: React.FC<propsType> = ({ setViewMenu, close_icon, logo }) => {

  const [closeMenu, setCloseMenu] = useState(false);

  function handleViewMenu() {
    setCloseMenu(true);
    setTimeout(function () {
      setViewMenu(false);
    }, 400);
  }

  const nav_classes = (): string => {
    let classes = " fixed w-screen h-screen top-0 left-0 -bg--color-white z-10";
    !closeMenu ? (classes += ' open-mobile-menu') : (classes += ' close-mobile-menu');
    return classes;
  }

  return (
    <nav className={nav_classes()}>
      <header className="w-full border-b -border--color-very-light-grey min-h-16 grid">
        <h1 className=" m-auto h-full px-2">
          <Link to='/'>
            <img src={logo} className="h-full w-8" />
          </Link>
        </h1>
        <button
          className="absolute right-0 top-0 p-4"
          onClick={() => handleViewMenu()}
        >
          <img src={close_icon} className="" />
        </button>
      </header>
      <section className="">
        <ul>
          <li className="border-b -border--color-very-light-grey">
            <Link
              to="/"
              onClick={() => setViewMenu(false)}
              className="block p-4"
            >
              HOME
            </Link>
          </li>
          <li className="border-b -border--color-very-light-grey">
            <Link to="/women" onClick={() => setViewMenu(false)} className="block p-4">WOMEN</Link>
          </li>
          <li className="border-b -border--color-very-light-grey">
            <Link to="/men" onClick={() => setViewMenu(false)} className="block p-4">MEN</Link>
          </li>
          <li className="border-b -border--color-very-light-grey">
            <Link to="/accessories" onClick={() => setViewMenu(false)} className="block p-4">ACCESSORIES</Link>
          </li>
          <li className="border-b -border--color-very-light-grey">
            <Link to="/accessories" onClick={() => setViewMenu(false)} className="block p-4">ACCOUNT</Link>
          </li>
          <li className="border-b -border--color-very-light-grey">
            <Link to="/accessories" onClick={() => setViewMenu(false)} className="block p-4">CONTACT</Link>
          </li>
        </ul>
      </section>
    </nav>
  )
}