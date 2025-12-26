import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchAds } from "@/api/admin/adminAPI";

type AdImage = {
  adv_id: number;
  src: string;
};

export default function DisplayImage() {
  const [images, setImages] = useState<AdImage[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchAds();
        setImages(data || []);
      } catch (error) {
        console.error("Failed to load images", error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  // Carousel Auto-Play Logic
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Navigation Functions
  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  if (loading) return <div className="h-[500px] flex items-center justify-center text-white/50">Loading slideshow...</div>;

  // Empty State (Fallback)
  if (images.length === 0) {
    return (
      <div className="w-full aspect-video bg-linear-to-r from-indigo-900 to-purple-900 rounded-3xl flex items-center justify-center border-4 border-black/20">
        <h2 className="text-3xl font-bold text-white">Empty Advertisement</h2>
      </div>
    );
  }

  // Render  Carousel
  return (
    <div className="w-full">
      <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-3xl border-4 border-black shadow-2xl">
        {images.map((img, i) => (
          <img
            key={img.adv_id}
            src={img.src}
            alt="Advertisement"
            className={`
              absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out
              ${i === index ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}

        {/* Arrows (Only show if more than 1 image) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors z-10"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors z-10"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === index ? "bg-white w-4" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}