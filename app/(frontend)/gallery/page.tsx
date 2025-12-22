import React from "react";
import { getGalleryById } from "@/lib/queries/gallery";
import { GalleryGrid } from "./_components/gallery-grid";

const GalleryPage = async () => {
  const gallery = await getGalleryById(1);

  if (!gallery || !gallery.images || gallery.images.length === 0) {
    return (
      <div className="container mx-auto pt-20 lg:pt-24 pb-12 px-6 lg:px-10">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Gallery
        </h1>
        <p className="text-muted-foreground">No images available at this time.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-20 lg:pt-24 pb-12">
      <div className="px-6 lg:px-10 pb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {gallery.title}
        </h1>
        {gallery.description && (
          <p className="text-muted-foreground mt-2">
            {gallery.description}
          </p>
        )}
      </div>
      <div className="px-6 lg:px-10">
        <GalleryGrid gallery={gallery} />
      </div>
    </div>
  );
};

export default GalleryPage;
