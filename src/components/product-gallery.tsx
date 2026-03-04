"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type GalleryImage = {
  id: string;
  url: string;
  alt: string | null;
};

export function ProductGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const activeImage = useMemo(
    () => images[activeIndex] ?? images[0],
    [images, activeIndex],
  );

  const openAt = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);
  const prev = () =>
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  const next = () => setActiveIndex((index) => (index + 1) % images.length);

  return (
    <>
      <div className="gallery">
        <button
          type="button"
          className="galleryMain galleryButton"
          style={{ backgroundImage: `url(${activeImage?.url})` }}
          onClick={() => setIsOpen(true)}
          aria-label="Открыть фото на весь экран"
        />
        <div className="galleryThumbs">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className={`galleryThumb galleryButton ${index === activeIndex ? "activeThumb" : ""}`}
              style={{ backgroundImage: `url(${image.url})` }}
              title={image.alt ?? title}
              onClick={() => openAt(index)}
              aria-label={`Открыть фото ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {isOpen ? (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="lightboxBackdrop" type="button" onClick={close} />
          <button
            className="lightboxClose"
            type="button"
            onClick={close}
            aria-label="Закрыть"
          >
            ×
          </button>
          {images.length > 1 ? (
            <button
              className="lightboxArrow leftArrow"
              type="button"
              onClick={prev}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
          ) : null}
          <Image
            src={activeImage?.url ?? images[0].url}
            alt={activeImage?.alt ?? title}
            className="lightboxImage"
            width={1600}
            height={1200}
            unoptimized
          />
          {images.length > 1 ? (
            <button
              className="lightboxArrow rightArrow"
              type="button"
              onClick={next}
              aria-label="Следующее фото"
            >
              ›
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
