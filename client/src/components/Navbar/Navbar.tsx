import { Link } from "react-router-dom"
import account_avatar from '../../assets/icons/nav icons/account-user-avatar.svg'
import instagram_icon from '../../assets/icons/nav icons/instagram.svg'
import search_icon from '../../assets/icons/nav icons/mobile and desktop/search-svgrepo-com.svg'
import menu from '../../assets/icons/nav icons/mobile/menu-svgrepo-com.svg'
import logo from '../../assets/icons/nav icons/mobile and desktop/amazon-svgrepo-com.svg'
import close_icon from '../../assets/icons/nav icons/mobile/close-sm-svgrepo-com.svg'
import { useCallback, useEffect, useState } from "react"
import { MobileMenu } from "../MobileMenu/MobileMenu"
import { MobileSearch } from "../MobileSearch/MobileSearch"
import { Cart } from "../Cart/Cart"

export const Navbar = () => {

  const [viewMenu, setViewMenu] = useState(false);
  const [searchMode, setSearchMode] = useState(false);

  const [y, setY] = useState(window.scrollY);
  const [scrollUp, setScrollUp] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);

  const handleNavigation = useCallback(
    e => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        console.log("scrolling up");
      } else if (y < window.scrollY) {
        console.log("scrolling down");
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

  const search_mode = () => {
    if (searchMode) {
      return (
        <MobileSearch setSearchMode={setSearchMode} search_icon={search_icon} close_icon={close_icon} />
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
      "link": "/accessories/",
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
    }
  ]


  return (
    <nav className="grid grid-cols-3 border-b -border--color-very-light-grey h-20 shadow-lg -shadow--color-very-light-grey">
      <section className="m-auto ml-4 h-full lg:hidden">
        <button
          className="h-full"
          onClick={() => setViewMenu(true)}
        >
          <img src={menu} className="h-full w-8" />
        </button>
        {menu_options()}
      </section>
      <h1 className="m-auto h-full py-2 lg:py-0 lg:ml-4">
        <Link to='/' className="">
          <img src={logo} className="h-full w-8 lg:w-10 mx-2" />
        </Link>
      </h1>
      <ul className="invisible w-full text-center h-full lg:visible lg:relative">
        {
          nav_links.map(link => {
            return (
              <li className="inline-block hover:border-b-2 w-32 h-full hover:cursor-pointer font-semibold group">
                <h1 className="h-full">
                  <Link to={link.link} className="h-full flex items-center justify-center">{link.name}</Link>
                </h1>
                <section className="hidden group-hover:grid hover:grid place-content-start absolute z-10 top-20 w-full -bg--color-white border -border--color-very-light-grey">
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
      {/* <ul className="invisible fixed w-full text-center py-6 lg:visible lg:relative">
        <li className="inline hover:border-b-2 px-4 py-6 hover:cursor-pointer font-semibold">
          <Link to="/women">WOMEN</Link>
        </li>
        <li className="inline px-8 hover:border-b-2 py-6 hover:cursor-pointer font-semibold">
          <Link to="/men">MEN</Link>
        </li>
        <li className="inline hover:border-b-2 px-4 py-6 hover:cursor-pointer font-semibold">
          <Link to="/accessories" className="h-full">ACCESSORIES</Link>
        </li>
      </ul> */}
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
          <Cart />
        </li>
      </ul>
    </nav>
  )
}