import React, { useEffect } from "react";
import ProductsCard from "./ProductsCard";
import RoundedPriceProvider from "../context/RoundedPriceProvider";
import { useNavigate } from "react-router-dom";

const Products = ({ products }) => {
  React.useEffect(() => {
    console.log(products);
  }, [products]);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/shop");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-10 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
          shopping everyday
        </h1>
        <div className="w-20 h-1 bg-black"></div>
        <p className="max-w-md lg:max-w-lg text-gray-700 text-center">
          All you need in one place and available in a few clicks
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
        {Array.isArray(products) &&
          products?.map((item) => (
            <RoundedPriceProvider key={item.id} product={item}>
              <ProductsCard key={item.id} product={item} />
            </RoundedPriceProvider>
          ))}
      </div>

      <div className="flex justify-center my-8">
        <button
          onClick={handleClick}
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold text-lg py-2 px-4 rounded"
        >
          Show more products
        </button>
      </div>
    </div>
  );
};

export default Products;
