import React from "react";
import StockistsLists from "./_components/stockists-lists";

const StockistsPage = () => {
  return (
    <div className="px-6 lg:px-8 container mx-auto pt-24 lg:pt-32 pb-24 lg:pb-28">
      <h1 className="text-3xl font-bold mb-8">Our Stockists</h1>
      <StockistsLists />
    </div>
  );
};

export default StockistsPage;
