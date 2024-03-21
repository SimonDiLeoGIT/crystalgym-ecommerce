import { Link } from "react-router-dom"
import ig from "../../assets/icons/social_media_icons/instagramsvg.svg"
import linkedin from "../../assets/icons/social_media_icons/linkedin.svg"
import git from "../../assets/icons/social_media_icons/github.svg"

export const Footer = () => {
  return (
    <footer className="-bg--color-black -text--color-white px-4 mt-4 lg:grid lg:grid-cols-2 ">
      <nav className="text-center p-2 m-auto max-w-lg lg:text-start">
        <ul className="">
          <li className="p-2 ">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:opacity-60">Home</Link>
          </li>
          <li className="p-2">
            <Link to="/new" className="hover:opacity-60">Products</Link>
          </li>
          <li className="p-2">
            <Link to="/terms&conditions" className="hover:opacity-60">Terms & Conditions</Link>
          </li>
        </ul>
      </nav>
      <section className="m-auto max-w-lg lg:row-span-2 lg:m- lg:p-8">
        <header>
          <h1 className="text-lg font-medium">Sign Up for Email</h1>
          <p className="my-2">
            Sign up to receive emails and get first dibs on new arrivals, sales,
            exclusive content, events and more!
          </p>
        </header>
        <form className="m-auto max-w-lg">
          <input
            type="text" placeholder="Name" required
            className="w-full p-2 -bg--color-very-light-grey -text--color-black placeholder:-text--color-black"
          />
          <input
            type="email" placeholder="Email" required
            className="w-full p-2 -bg--color-very-light-grey -text--color-black placeholder:-text--color-black mt-2"
          />
          <input
            type="submit"
            value="Submit"
            className="-text--color-black -bg--color-light-grey-violet font-bold p-2 w-24 my-4 hover:opacity-60 hover:cursor-pointer"
          />
        </form>
      </section>
      <section className="m-auto max-w-lg lg:m-auto">
        <header>
          <h1>Contact Us</h1>
        </header>
        <ul className="flex place-content-center my-4 lg:place-content-start">
          <li>
            <a href="https://www.linkedin.com/in/simondileodev/" target="_blank">
              <img
                src={linkedin}
                alt="https://www.linkedin.com/in/simondileodev/"
                className="w-8"
              />
            </a>
          </li>
          <li className="mx-10">
            <a href="https://github.com/SimonDiLeoGIT" target="_blank">
              <img
                src={git}
                alt="https://github.com/SimonDiLeoGIT"
                className="w-8"
              />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/simondileo/" target="_blank">
              <img
                src={ig}
                alt="https://www.instagram.com/simondileo/"
                className="w-8"
              />
            </a>
          </li>
        </ul>
        <p className="text-sm">e-commerce@gmail.com</p>
        <p className="text-sm mt-2">Gowland, Buenos Aires 513 n° 223</p>
      </section>
      <p className="py-4 w-full text-center lg:col-span-2">&copy; 2024 e-commerce</p>
    </footer>
  )
}