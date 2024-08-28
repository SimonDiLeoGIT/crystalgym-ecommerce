import { Link } from "react-router-dom"
import { lazy, useCallback, useEffect, useState } from "react"
import { Cart } from "../Cart/Cart"
import { useCart } from "../../hook/useCart"
import "./Navbar.css"
import account_avatar from '../../assets/icons/nav icons/account-user-avatar.svg'
import logo from '../../assets/icons/CrystalGymLogo.png'
import black_logout from '../../assets/icons/nav icons/logout.svg'
import red_logout from '../../assets/icons/nav icons/logout-red.svg'

import useWindowSize from "../../utils/useWindowSize"
import { useUser } from "../../hook/useUser"

const MobileMenu = lazy(() => import("../MobileMenu/MobileMenu"))
const MobileSearch = lazy(() => import("../Search/MobileSearch/MobileSearch"))
const DesktopSearch = lazy(() => import("../Search/DesktopSearch/DesktopSearch"))

const Navbar = () => {

  const { isOpenCart } = useCart()

  const [y, setY] = useState(window.scrollY);
  const [scrollUp, setScrollUp] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);

  const handleNavigation = useCallback((e: Event) => {
    const window = e.currentTarget as Window;
    if (y > window.scrollY) {
      setScrollDown(false)
      setScrollUp(true)
    } else if (y < window.scrollY) {
      setScrollUp(false)
      window.scrollY > 60 && setScrollDown(true)
    }
    setY(window.scrollY);
  }, [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  useEffect(() => {
    if (isOpenCart) {
      setScrollDown(false)
      setScrollUp(true)
    }
  }, [isOpenCart])

  const nav_links = [
    {
      "name": "WOMEN",
      "link": "/women/",
      "sections": [
        {
          "title": "Products",
          "links": [
            {
              "label": "All Women",
              "link": "/women/"
            },
            {
              "label": "Top",
              "link": "/women/Top"
            },
            {
              "label": "T-Shirt",
              "link": "/women/T-Shirt"
            },
            {
              "label": "Hoodie",
              "link": "/women/Hoodie"
            },
            {
              "label": "Jogger",
              "link": "/women/Jogger"
            }
          ]
        }
      ]
    },
    {
      "name": "MEN",
      "link": "/men/",
      "sections": [
        {
          "title": "Products",
          "links": [
            {
              "label": "All Men",
              "link": "/men/"
            },
            {
              "label": "T-Shirt",
              "link": "/men/T-Shirt"
            },
            {
              "label": "Hoodie",
              "link": "/men/Hoodie"
            },
            {
              "label": "Jogger",
              "link": "/men/Jogger"
            },
            {
              "label": "Short",
              "link": "/men/Short"
            }
          ]
        }
      ]
    },
    {
      "name": "ACCESSORIES",
      "link": "/accessories",
      "sections": [
        {
          "title": "Products",
          "links": [
            {
              "label": "All Products",
              "link": "/accessories"
            },
            {
              "label": "Caps",
              "link": "/accessories/Cap"
            },
            {
              "label": "Belts",
              "link": "/accessories/Belt"
            },
            {
              "label": "Bags",
              "link": "/accessories/Bag"
            }
          ]
        }
      ]
    }
  ]

  const { width } = useWindowSize();
  const isMobile = width !== undefined && width < 1024;

  const { getUser } = useUser();

  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <nav className={`grid grid-cols-3 border-b -border--color-very-light-grey h-20 shadow-lg -shadow--color-very-light-grey z-40 -bg--color-white transition-transform duration-500 fixed w-screen px-4 top-0 ${scrollDown && !isOpenCart && " scroll-down shadow-none"} ${scrollUp && " scroll-up"}`}>
      <section className="m-auto ml-4 h-full lg:hidden">
        {isMobile && <MobileMenu />}
      </section>
      <h1 className="m-auto h-full py-2 lg:py-0 lg:ml-0 overflow-hidden flex items-center">
        <Link to='/' className="flex items-center">
          <img src={logo} className="min-w-16 w-16 lg: mx-2" alt="CrystalGym Logo"/>
          <div className="hidden md:block font-bold">CrystalGym</div>
        </Link>
      </h1>
      <ul className="invisible hidden w-full text-center h-full lg:visible lg:relative lg:block -bg--color-white">
        {
          nav_links.map(link => {
            return (
              <li className="inline-block hover:border-b-2 w-24 h-full hover:cursor-pointer font-semibold group">
                <h1 className="h-full">
                  <Link to={link.link} className="h-full flex items-center justify-center">{link.name}</Link>
                </h1>
                <section className="hidden group-hover:grid hover:grid place-content-start absolute -z-20 top-20 w-full left-0 -bg--color-white border -border--color-very-light-grey open-submenu">
                  {
                    link.sections.map(section => {
                      return (
                        <article className="col-span-1 p-4 text-start">
                          <h1 className="font-bold text-lg -text--color-black">
                            {section.title}
                          </h1>
                          <ul>
                            {section.links.map(link => {
                              return (
                                <li className="font-medium py-1 -text--color-greyest-violet hover:-text--color-dark-grey-violet">
                                  <Link to={link.link}>{link.label}</Link>
                                </li>
                              )
                            })
                            }
                          </ul>
                        </article>
                      )
                    })
                  }
                </section>
              </li>
            )
          })
        }
      </ul>
      <ul className="flex place-content-end min-w-28 mr-2">
        <li className="invisible hidden h-full items-center lg:visible lg:flex lg:relative mr-1">
          {!isMobile && <DesktopSearch />}
        </li>
        <li className="invisible hidden fixed px-1 my-auto h-full lg:flex items-center lg:visible lg:relative">
          <Link to='/profile' className="">
            <div className="w-10 h-10 flex items-center duration-150 hover:bg-opacity-50 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-very-light-grey rounded-full">
              <img src={account_avatar} className="m-auto w-7" alt="Profile Icon"/>
            </div>
          </Link>
        </li>
        <li className="my-auto px-1 h-full flex items-center lg:hidden">
          {isMobile && <MobileSearch />}
        </li>
        <li className="h-full px-1">
          <Cart />
        </li>
        {
          getUser() !== null &&
          <li className="invisible hidden fixed my-auto px-1 h-full lg:flex items-center lg:visible lg:relative">
            <button onClick={() => logout()} className="realative">
              <div className="w-10 h-10 flex items-center rounded-full hover:opacity-0">
                <img src={black_logout} className="m-auto w-8" alt="Instagram Icon"/>
              </div>
              <div className="absolute top-1/4 opacity-0 hover:opacity-100 w-10 h-10 flex items-center duration-150 hover:bg-opacity-20 hover:-bg--color-red hover:shadow-md hover:-shadow--color-red rounded-full">
                <img src={red_logout} className="m-auto w-8" alt="Instagram Icon"/>
              </div>
            </button>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Navbar