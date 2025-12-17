import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function DisplayImage() {
  const images = useSelector(
    (state: RootState) => state.overviewImages.images
  );
  //manual change the image
  const [index, setIndex] = useState(0);
  if(images.length === 0) return null;
  const prev = () => {
    setIndex(i => (i ===0? images.length-1 : i-1));
  };
  const next = () => {
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className=" w-full ">
      <div className="relative w-full aspect-video overflow-hidden rounded-3xl border-4 border-black ">
      {images.map((img, i) => (
        <img
          key={img.id}
          src={img.src}
          className={`
            absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out
            ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {/* next n prev arrow */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
          >
            <FaChevronRight />
          </button>
        </>
      )}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
