import { Link } from "react-router-dom"
import ig from "../assets/social_media_icons/instagramsvg.svg"
import face from "../assets/social_media_icons/facebook.svg"
import linkedin from "../assets/social_media_icons/linkedin.svg"
import git from "../assets/social_media_icons/github.svg"

export const Footer = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/">Terms & Conditions</Link>
          </li>
        </ul>
      </nav>
      <section>
        <header>
          <h1>Sign Up for Email</h1>
          <p>
            Sign up to receive emails and get first dibs on new arrivals, sales,
            exclusive content, events and more!
          </p>
        </header>
        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="submit" />
        </form>
      </section>
      <section>
        <header>
          <h1>Contact Us</h1>
        </header>
        <ul className="flex place-content-center">
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
        <p>e-commerce@gmail.com</p>
        <p>Gowland, Buenos Aires 513 n° 223</p>
      </section>
      <p>&copy; 2024 e-commerce</p>
    </footer>
  )
}