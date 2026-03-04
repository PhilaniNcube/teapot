import React from "react";
import StockistsLists from "./_components/stockists-lists";

const StockistsPage = () => {
  return (
    <div className="px-4 container max-w-7xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-8">Our Stockists</h1>
      <StockistsLists />
    </div>
  );
};

export default StockistsPage;
