import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

interface props {
  imageUrl: string
  imageBlurHash: string
  imageStyles: string
  alt: string
}

export const ImageLoad: React.FC<props> = ({ imageUrl, imageBlurHash, imageStyles, alt }) => {

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Crear una nueva imagen para cargar
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);

    // Limpiar el efecto al desmontar el componente
    return () => {
      setImageLoaded(false);
    };
  }, [imageUrl]);

  return (
    <>
      {
        !imageLoaded &&
        imageBlurHash &&
        <Blurhash
          style={{
            minWidth: "100%",
            height: "100%",
            maxHeight: "100%",
          }}
          // hash="LqLz?WWV~qoL?bj[M|f6xvofoLay"
          hash={imageBlurHash}
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
          className={imageStyles}
          alt={alt}
          loading="lazy"
        />
      }
    </>
  )
}