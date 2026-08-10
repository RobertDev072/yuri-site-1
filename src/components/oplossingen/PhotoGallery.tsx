"use client";

import { motion } from "framer-motion";
import MoodPhoto from "@/components/MoodPhoto";

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
};

/**
 * Square-tile photo grid, lifted from the homepage <Projects> gallery, so
 * detail pages with a real photo set (currently: dakrenovatie) reuse the
 * exact same "recent opgeleverd" visual treatment.
 */
export default function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.src}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: (index % 4) * 0.06, ease: "easeOut" }}
          className="group relative aspect-square overflow-hidden rounded-xl bg-background-alt"
        >
          <MoodPhoto
            src={photo.src}
            alt={photo.alt}
            fill
            tint="edge"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            containerClassName="absolute inset-0"
            imageClassName="object-cover transition-transform duration-500 group-hover:scale-110"
          >
            <p className="absolute bottom-0 left-0 right-0 p-3 text-xs font-semibold text-white sm:text-sm">
              {photo.caption}
            </p>
          </MoodPhoto>
        </motion.div>
      ))}
    </div>
  );
}
