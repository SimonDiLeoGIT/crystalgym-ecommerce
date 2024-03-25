import { Link } from "react-router-dom"
import { useState } from "react"
import './mobile-menu.css'
import open_arrow from "../../assets/icons/moblile menu/arrow-open-down-svg.svg"
import menu from "../../assets/icons/nav icons/mobile/menu-svgrepo-com.svg"
import close_menu from "../../assets/icons/nav icons/mobile/close-sm-svgrepo-com.svg"
import logo from "../../assets/icons/nav icons/mobile and desktop/amazon-svgrepo-com.svg"

export const MobileMenu = () => {

  const [openMenu, setOpenMenu] = useState(false);
  const [sectionOpen, setSectionOpen] = useState<string[]>([])
  const [viewMenu, setViewMenu] = useState(false)

  function handleViewMenu() {
    setOpenMenu(!openMenu);
    viewMenu ? setTimeout(function () {
      setViewMenu(!viewMenu);
    }, 200)
      : setViewMenu(!viewMenu);
  }

  const nav_classes = (): string => {
    let classes = " fixed w-screen h-screen top-0 left-0 -bg--color-white z-10 md:w-[32rem] ";
    if (openMenu) {
      classes += ' open-mobile-menu'
      document.body.classList.add('none-scroll')
    } else {
      classes += ' close-mobile-menu'
      document.body.classList.remove('none-scroll')
    }
    return classes;
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
              "label": "All Products",
              "link": "/accessories/all"
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

  function handleOpenSection(section: string) {
    sectionOpen.includes(section) ? setSectionOpen(sectionOpen.filter(item => item !== section)) : setSectionOpen([...sectionOpen, section])
  }

  return (
    <>
      <button
        className="h-full"
        onClick={() => handleViewMenu()}
      >
        <img src={menu} className="h-full w-8" />
      </button>

      <aside className={`fixed top-0 left-0 w-screen h-screen z-50 overflow-hidden md:left-0 opacity-animation ${!viewMenu && " hidden"} overflow-hidden`}>
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
              <img src={close_menu} className="" />
            </button>
          </header>
          <section className="h-full overflow-y-auto">
            <ul className="font-semibold mb-16">
              <li className="border-b -border--color-very-light-grey">
                <Link
                  to="/"
                  onClick={() => handleViewMenu()}
                  className="block p-4"
                >
                  HOME
                </Link>
              </li>
              {
                nav_links.map(link => {
                  return (
                    <li className="border-b -border--color-very-light-grey">
                      <details className="block p-4 hover:cursor-pointer" onClick={() => handleOpenSection(link.name)}>
                        <summary className="list-none grid grid-cols-2 relative ">
                          {link.name}
                          <span><img src={open_arrow} alt="open arrow" className={`w-3 absolute bottom-0 right-0 transition-transform ${(sectionOpen.includes(link.name)) ? "rotate-180" : ""}`} /></span>
                        </summary>
                        <ul>
                          {
                            link.sections.map(section => {
                              return (
                                <ul className="font-medium">
                                  {
                                    section.links.map(link => {
                                      return (
                                        <li className="-text--color-greyest-violet hover:-text--color-dark-grey-violet">
                                          <Link to={link.link} onClick={() => handleViewMenu()} className="block p-4">{link.label}</Link>
                                        </li>
                                      )
                                    })
                                  }
                                </ul>
                              )
                            })
                          }
                        </ul>
                      </details>
                    </li>
                  )
                })
              }
              <li className="border-b -border--color-very-light-grey">
                <Link to="/profile" onClick={() => handleViewMenu()} className="block p-4">ACCOUNT</Link>
              </li>
            </ul>
          </section>
        </nav>
      </aside>
    </>
  )
}