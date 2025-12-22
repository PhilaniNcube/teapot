"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import type { Media, Gallery } from "@/payload-types";

type GalleryImage = {
  image: string | Media;
  caption?: string | null;
  altText?: string | null;
  id?: string;
};

type GalleryGridProps = {
  gallery: Gallery;
};

export function GalleryGrid({ gallery }: GalleryGridProps) {
  const images = gallery.images?.filter(img => typeof img.image !== 'number') || [];
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((item, index) => {
          const media = typeof item.image === "object" ? item.image : null;
          const imageUrl = media?.url || "";
          const altText = item.altText || media?.alt || `Gallery image ${index + 1}`;

          return (
            <button
              key={item.id || index}
              onClick={() => setSelectedImage(item as GalleryImage)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm">{item.caption}</p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden bg-transparent">
          <VisuallyHidden>
            <DialogTitle>Gallery Image</DialogTitle>
          </VisuallyHidden>
          {selectedImage && (
            <div className="relative w-full h-full min-h-[50vh] max-h-[90vh]">
              {(() => {
                const media = typeof selectedImage.image === "object" ? selectedImage.image : null;
                const imageUrl = media?.url || "";
                const altText = selectedImage.altText || media?.alt || "Gallery image";

                return (
                  <>
                    {imageUrl && (
                      <div className="relative w-full h-full">
                        <Image
                          src={imageUrl}
                          alt={altText}
                          width={media?.width || 1200}
                          height={media?.height || 800}
                          className="w-full h-full object-contain"
                          priority
                        />
                      </div>
                    )}
                    {selectedImage.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-black/70 p-4">
                        <p className="text-white text-center">{selectedImage.caption}</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
