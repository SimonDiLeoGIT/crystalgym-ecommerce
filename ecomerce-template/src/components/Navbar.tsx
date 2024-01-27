import { Link } from "react-router-dom"
import account_avatar from './../assets/nav icons/account-user-avatar.svg'
import instagram_icon from './../assets/nav icons/instagram.svg'
import bag_icon from './../assets/nav icons/bag-shopping.svg'

export const Navbar = () => {
  return (
    <nav className="grid grid-cols-3 border-2">
      <h1 className="my-auto mx-4">
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
      </ul>
    </nav>
  )
}