/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Image } from "react-konva";

export const SrcImage = (props) => {
  const { src, width, height, x, y, scaleX, scaleY, onClick, onMouseEnter } =
    props;
  const [image, setImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState();

  const mapRef = useRef(null);

  useEffect(() => {
    const imageToLoad = new window.Image();
    imageToLoad.src = src;
    setLoadingImage(imageToLoad);
  }, []);

  useEffect(() => {
    if (loadingImage) {
      const imageToLoad = loadingImage;
      imageToLoad.addEventListener("load", setImage(imageToLoad));
      return () => {
        imageToLoad.removeEventListener("load", setImage(imageToLoad));
      };
    }
  }, [loadingImage]);

  return (
    <Image
      image={image}
      ref={mapRef}
      width={width}
      height={height}
      x={x}
      y={y}
      scaleX={scaleX}
      scaleY={scaleY}
      onMouseEnter={onMouseEnter}
      onClick={onClick ? onClick : () => {}}
    />
  );
};

export default SrcImage;
