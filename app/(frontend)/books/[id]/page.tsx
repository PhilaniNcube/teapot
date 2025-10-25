import React from "react";
import BookDetails from "../_components/book-details";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="py-32 container mx-auto px-6 lg:px-10">
      <BookDetails id={parseInt(id)} />
    </div>
  );
};

export default page;
