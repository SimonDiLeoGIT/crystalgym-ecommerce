import { Link } from 'react-router-dom'
import '../styles/global/carousel.css'
import { useState } from 'react'

interface Advertisement {
  id: string,
  image: string,
  title_front: string,
  title_middle: string,
  title_end: string,
  info: string,
  button_title: string,
  button_link: string,
}

type AdvertisementsType = Advertisement[]

interface Props {
  advertisements: AdvertisementsType
}


export const Carousel: React.FC<Props> = ({ advertisements }) => {

  const [currentAdvertisement, changeCurrentAdvertisement] = useState(0);

  function nextAdvertisement() {
    if (currentAdvertisement < 2) {
      changeCurrentAdvertisement(currentAdvertisement + 1);
    } else {
      changeCurrentAdvertisement(0);
    }
  }

  return (
    <section className='relative w-screen h-screen'>
      <section
        className='w-screen h-screen bg-cover bg-center grid place-content-end gap-12 carousel-animation'
        style={{ backgroundImage: `url(${advertisements[currentAdvertisement].image})` }}
      >
        <section className='w-screen px-5'>
          <h1 className="font-bold text-2xl">{advertisements[currentAdvertisement].title_front}<span className="-text--color-light-grey-violet -bg--color-black rounded-md px-2 mx-2">{advertisements[currentAdvertisement].title_middle}</span> {advertisements[currentAdvertisement].title_end}</h1>
          <h2 className="font-semibold text-sm">{advertisements[currentAdvertisement].info}</h2>
        </section>
        <Link to={advertisements[currentAdvertisement].button_link} className="text-center -bg--color-light-grey-violet font-bold p-4 rounded-full w-11/12 m-auto mb-4">{advertisements[currentAdvertisement].button_title}</Link>
      </section>
      <div className='absolute w-screen grid grid-cols-2 top-1/2'>
        <button
          className='m-auto ml-4'
        >
          A
        </button>
        <button
          className='m-auto mr-4'
          onClick={() => nextAdvertisement()}
        >
          A
        </button>
      </div>
    </section>
  )
}