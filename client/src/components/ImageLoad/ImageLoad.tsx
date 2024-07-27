import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
// import { encode } from "blurhash";

interface props {
  imageUrl: string
}

export const ImageLoad: React.FC<props> = ({ imageUrl }) => {

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true)
    }
    img.src = imageUrl
  }, [imageUrl])

  return (
    <>
      {!imageLoaded &&
        <Blurhash
          // className="min-w-full h-screen max-h-screen object-cover"
          style={{
            minWidth: "100%",
            height: "100%",
            maxHeight: "100%",
          }}
          hash="L4Am#hRP008_?^_2nNR:Xo%gIU-;"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      }
      {
        imageLoaded &&
        <img
          src={imageUrl}
          onLoad={() => setImageLoaded(true)}
          className="min-w-full h-screen max-h-screen object-cover"
          loading="lazy"
        />
      }
    </>
  )
}