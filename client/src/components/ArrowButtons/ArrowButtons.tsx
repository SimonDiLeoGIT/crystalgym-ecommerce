import React from 'react'
import left_arrow from '../../assets/icons/carousel/left-arrow.svg'
import right_arrow from '../../assets/icons/carousel/right-arrow.svg'

interface Props {
  currentImage: number
  changeCurrentImage: (image: number) => void
  setTranslateValue: (image: number) => void
  carousel: boolean
}

export const ArrowButtons: React.FC<Props> = ({ currentImage, changeCurrentImage, setTranslateValue, carousel }) => {

  function nextImage() {
    let newIndex = (currentImage + 1);
    if (currentImage < 2) {
      changeCurrentImage(currentImage + 1);
    } else {
      changeCurrentImage(0);
      newIndex = 0;
    }
    setTranslateValue(-100 * newIndex);
  }

  function prevImage() {
    let newIndex = (currentImage - 1);
    if (currentImage > 0) {
      changeCurrentImage(currentImage - 1);
    } else {
      changeCurrentImage(2);
      newIndex = 2;
    }
    setTranslateValue(-100 * newIndex);
  }

  return (
    <div>
      <button
        className={`absolute top-1/2 left-4 rounded-full -bg--color-light-grey-violet opacity-60 shadow-md -shadow--color-greyest-violet hover:opacity-45 ${carousel && " md:bottom-2 md:top-2 md:left-2 md:px-2"}`}
        onClick={() => prevImage()}
      >
        <img
          src={left_arrow} alt=""
          width='30px'
        />
      </button>
      <button
        className={`absolute top-1/2 right-4 rounded-full -bg--color-light-grey-violet opacity-60 shadow-md -shadow--color-greyest-violet hover:opacity-45 ${carousel && " md:bottom-2 md:top-2 md:right-2 md:px-2"}`}
        onClick={() => nextImage()}
      >
        <img
          src={right_arrow} alt=""
          width='30px'
        />
      </button>
    </div>
  )
}