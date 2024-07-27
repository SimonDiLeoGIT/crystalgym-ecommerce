import { Link } from 'react-router-dom'
import './carousel.css'
import { useEffect, useState } from 'react'
import { ArrowButtons } from '../ArrowButtons/ArrowButtons'
import { ImageLoad } from '../ImageLoad/ImageLoad'

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
  mobileImages: ImagesType,
  desktopImages: ImagesType,
  advertisement: image
}


const Carousel: React.FC<Props> = ({ advertisement, mobileImages, desktopImages }) => {

  const [currentImage, changeCurrentImage] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getImages = () => {
    let images: ImagesType;
    (windowWidth < 768) ? (images = mobileImages) : (images = desktopImages)
    return images;
  }

  return (
    <section className='relative w-full overflow-x-auto -bg--color-very-light-grey bg-opacity-65 shadow-lg -shadow--color-grey m-auto lg:my-8 lg:w-11/12 lg:rounded-xl'>
      <div className='overflow-hidden m-auto'>
        <section className='md:h-[32rem] lg:h-[40rem] xl:h-[48rem] flex transition-transform duration-500 ease-in-out' style={{ transform: `translateX(${translateValue}%)` }}>
          {getImages().map((image) => {
            return (
              <ImageLoad
                imageUrl={image.image}
              />
              // <img
              //   src={image.image}
              //   alt={image.id}
              //   className='min-w-full h-screen max-h-screen object-cover md:h-[32rem] lg:h-[40rem] xl:h-[48rem]'
              //   loading='lazy'
              // />
            )
          })}
        </section>
      </div>
      <section className='absolute top-2/3 grid gap-12 w-full md:top-auto md:bottom-4 md:left-16 md:w-96 md:h-44 md:rounded-xl md:gap-0 md:-bg--color-very-light-grey md:bg-opacity-60'>
        <section className=' w-full p-5 -bg--color-very-light-grey bg-opacity-60 md:bg-opacity-0'>
          <h1 className="font-bold text-2xl">{advertisement.title_front}<span className="-text--color-light-grey-violet -bg--color-black rounded-md px-2 mx-2">{advertisement.title_middle}</span> {advertisement.title_end}</h1>
          <p className="font-semibold text-sm">{advertisement.info}</p>
        </section>
        <Link to={advertisement.button_link} className="text-center -bg--color-black -text--color-light-grey-violet font-bold p-4 rounded-full w-11/12 max-w-lg m-auto mb-4 duration-150 hover:opacity-85">{advertisement.button_title}</Link>
      </section>
      <ArrowButtons currentImage={currentImage} changeCurrentImage={changeCurrentImage} setTranslateValue={setTranslateValue} carousel={true} />
    </section>
  )
}

export default Carousel;