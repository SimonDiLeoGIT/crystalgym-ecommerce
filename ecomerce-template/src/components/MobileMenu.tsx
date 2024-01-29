import { Link } from "react-router-dom"

interface propsType {
  setViewMenu(state: boolean): void,
  search_icon: string,
  close_icon: string,
  logo: string,
}

export const MobileMenu: React.FC<propsType> = ({ setViewMenu, close_icon, logo }) => {


  return (
    <nav className="fixed w-screen h-screen top-0 left-0 bg-white">
      <header className="w-full border-b-2 min-h-16 grid">
        <h1 className=" m-auto h-full px-2">
          <Link to='/'>
            <img src={logo} className="h-full w-8" />
          </Link>
        </h1>
        <button
          className="absolute right-0 top-0 p-4"
          onClick={() => setViewMenu(false)}
        >
          <img src={close_icon} className="" />
        </button>
      </header>
      <section className="">
        <ul>
          <li className="border-b-2">
            <Link
              to="/"
              onClick={() => setViewMenu(false)}
              className="block p-4"
            >
              HOME
            </Link>
          </li>
          <li className="border-b-2">
            <Link to="/women" onClick={() => setViewMenu(false)} className="block p-4">WOMEN</Link>
          </li>
          <li className=" border-b-2">
            <Link to="/men" onClick={() => setViewMenu(false)} className="block p-4">MEN</Link>
          </li>
          <li className="border-b-2">
            <Link to="/accessories" onClick={() => setViewMenu(false)} className="block p-4">ACCESSORIES</Link>
          </li>
          <li className="border-b-2">
            <Link to="/accessories" onClick={() => setViewMenu(false)} className="block p-4">ACCOUNT</Link>
          </li>
          <li className="border-b-2">
            <Link to="/accessories" onClick={() => setViewMenu(false)} className="block p-4">CONTACT</Link>
          </li>
        </ul>
      </section>
    </nav>
  )
}