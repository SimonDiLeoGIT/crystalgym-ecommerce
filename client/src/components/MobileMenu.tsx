import { Link } from "react-router-dom"
import './../styles/mobile-menu.css'
import { useState } from "react"
import open_arrow from "../assets/icons/moblile menu/arrow-open-down-svg.svg"

interface propsType {
  setViewMenu(state: boolean): void,
  close_icon: string,
  logo: string,
}

export const MobileMenu: React.FC<propsType> = ({ setViewMenu, close_icon, logo }) => {

  const [closeMenu, setCloseMenu] = useState(false);
  const [openWomen, setWomenOpen] = useState(false);
  const [openMen, setMenOpen] = useState(false);
  const [openAccessories, setAccessoriesOpen] = useState(false);

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
            <details className="block p-4" onClick={() => setWomenOpen(!openWomen)}>
              <summary className="list-none grid grid-cols-2 relative">
                WOMEN
                <span><img src={open_arrow} alt="open arrow" className={`w-3 absolute bottom-0 right-0 transition-transform ${openWomen ? "rotate-180" : ""}`} /></span>
              </summary>
              <ul>
                <li>
                  <Link to="/women" onClick={() => setViewMenu(false)} className="block p-4">All Products</Link>
                </li>
                <li>
                  <Link to="/women" onClick={() => setViewMenu(false)} className="block p-4"> Tops </Link>
                </li>
                <li>
                  <Link to="/women" onClick={() => setViewMenu(false)} className="block p-4"> T-Shirt </Link>
                </li>
                <li>
                  <Link to="/women" onClick={() => setViewMenu(false)} className="block p-4"> Hoodies </Link>
                </li>
                <li>
                  <Link to="/women" onClick={() => setViewMenu(false)} className="block p-4"> Joggers </Link>
                </li>
              </ul>
            </details>
          </li>
          <li className="border-b -border--color-very-light-grey">
            <details className="block p-4" onClick={() => setMenOpen(!openMen)}>
              <summary className="list-none grid grid-cols-2 relative">
                MEN
                <span><img src={open_arrow} alt="open arrow" className={`w-3 absolute bottom-0 right-0 transition-transform ${openMen ? "rotate-180" : ""}`} /></span>
              </summary>
              <ul>
                <li>
                  <Link to="/men" onClick={() => setViewMenu(false)} className="block p-4">All Products</Link>
                </li>
                <li>
                  <Link to="/men" onClick={() => setViewMenu(false)} className="block p-4"> T-Shirt </Link>
                </li>
                <li>
                  <Link to="/men" onClick={() => setViewMenu(false)} className="block p-4"> Hoodies </Link>
                </li>
                <li>
                  <Link to="/men" onClick={() => setViewMenu(false)} className="block p-4"> Joggers </Link>
                </li>
              </ul>
            </details>
          </li>
          <li className="border-b -border--color-very-light-grey">
            <details className="block p-4" onClick={() => setAccessoriesOpen(!openAccessories)}>
              <summary className="list-none grid grid-cols-2 relative">
                ACCESSORIES
                <span><img src={open_arrow} alt="open arrow" className={`w-3 absolute bottom-0 right-0 transition-transform ${openAccessories ? "rotate-180" : ""}`} /></span>
              </summary>
              <ul>
                <li>
                  <Link to="/accessories" onClick={() => setViewMenu(false)} className="block p-4">All Products</Link>
                </li>
                <li>
                  <Link to="/accessories" onClick={() => setViewMenu(false)} className="block p-4"> Caps </Link>
                </li>
                <li>
                  <Link to="/accessories" onClick={() => setViewMenu(false)} className="block p-4"> Bags </Link>
                </li>
                <li>
                  <Link to="/accessories" onClick={() => setViewMenu(false)} className="block p-4"> Gym Products </Link>
                </li>
              </ul>
            </details>
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