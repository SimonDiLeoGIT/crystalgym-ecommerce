import { Link } from 'react-router-dom'
import './carousel.css'
import { useState } from 'react'
import left_arrow from '../../assets/icons/carousel/left-arrow.svg'
import right_arrow from '../../assets/icons/carousel/right-arrow.svg'
interface image {
  title_front: string,
  title_middle: string,
  title_end: string,
  info: string,
  button_title: string,
  button_link: string,
}

interface Image {
  id: string,
  image: string,
}

type ImagesType = Image[]

interface Props {
  images: ImagesType,
  advertisement: image
}


export const Carousel: React.FC<Props> = ({ advertisement, images }) => {

  const [currentimage, changeCurrentimage] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  function nextimage() {
    let newIndex = (currentimage + 1);
    if (currentimage < 2) {
      changeCurrentimage(currentimage + 1);
    } else {
      changeCurrentimage(0);
      newIndex = 0;
    }
    setTranslateValue(-100 * newIndex);
  }

  function previmage() {
    let newIndex = (currentimage - 1);
    if (currentimage > 0) {
      changeCurrentimage(currentimage - 1);
    } else {
      changeCurrentimage(2);
      newIndex = 2;
    }
    setTranslateValue(-100 * newIndex);
  }

  return (
    <section className='relative w-full overflow-x-auto shadow-lg -shadow--color-grey m-auto lg:my-8 lg:w-11/12 lg:rounded-xl'>
      <div className='overflow-hidden m-auto '>
        <section className='flex transition-transform duration-500 ease-in-out' style={{ transform: `translateX(${translateValue}%)` }}>
          {images.map((image) => {
            return (
              <img
                src={image.image}
                alt={image.id}
                className='min-w-full h-screen max-h-screen object-cover md:h-[32rem]'
              />
            )
          })}
        </section>
      </div>
      <section className='absolute top-2/3 grid gap-12 w-full md:top-auto md:bottom-4 md:left-16 md:w-96 md:h-44 md:rounded-xl md:gap-0 md:-bg--color-very-light-grey md:bg-opacity-60'>
        <section className=' w-full p-5 -bg--color-very-light-grey bg-opacity-60 md:bg-opacity-0 '>
          <h1 className="font-bold text-2xl">{advertisement.title_front}<span className="-text--color-light-grey-violet -bg--color-black rounded-md px-2 mx-2">{advertisement.title_middle}</span> {advertisement.title_end}</h1>
          <p className="font-semibold text-sm">{advertisement.info}</p>
        </section>
        <Link to={advertisement.button_link} className="text-center -bg--color-light-grey-violet font-bold p-4 rounded-full w-11/12 max-w-lg m-auto mb-4">{advertisement.button_title}</Link>
      </section>
      <button
        className='absolute top-1/2 left-4 rounded-full -bg--color-light-grey-violet opacity-60 shadow-md -shadow--color-greyest-violet hover:opacity-45 md:bottom-2 md:top-2 md:left-2 md:px-2'
        onClick={() => previmage()}
      >
        <img
          src={left_arrow} alt=""
          width='30px'
        />
      </button>
      <button
        className='absolute top-1/2 right-4 rounded-full -bg--color-light-grey-violet opacity-60 shadow-md -shadow--color-greyest-violet hover:opacity-45 md:bottom-2 md:top-2 md:right-2 md:px-2'
        onClick={() => nextimage()}
      >
        <img
          src={right_arrow} alt=""
          width='30px'
        />
      </button>
    </section>
  )
}