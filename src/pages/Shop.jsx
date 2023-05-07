import React, { useState, useEffect } from "react";
import ProductsCard from "../components/ProductsCard";
import { paginationData } from "../api/Api";
import Spinner from "../components/Spinner";
import RoundedPriceProvider from "../context/RoundedPriceProvider";

const Shop = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      const data = await paginationData(limit);
      if (data) {
        setProductList(
          data.products.filter(
            (product) =>
              product.title.toLowerCase().includes(query.toLowerCase()) &&
              product.category.toLowerCase().includes(category.toLowerCase())
          )
        );
        const categoriesSet = new Set();
        data.products.forEach((product) => categoriesSet.add(product.category));
        setCategories(Array.from(categoriesSet));
      }
      setLoading(false);
    };
    fetchData();
  }, [query, category, limit]);

  const handlePaginationClick = () => {
    setLimit(limit + 20);
  };

  useEffect(() => {
    if (window.history.state?.from !== "shop") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between items-center py-8 sm:flex-row">
            <div>
              <input
                type="text"
                placeholder="Search product..."
                className="border border-gray-500 rounded p-2 w-full sm:w-60 my-2 md:w-80 lg:w-96"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                className="border border-gray-500 rounded p-2 w-full sm:w-60 my-2 md:w-80 lg:w-96"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productList?.map((item) => (
              <RoundedPriceProvider key={item.id} product={item}>
                <ProductsCard key={item.id} product={item} />
              </RoundedPriceProvider>
            ))}
          </div>
          <div className="flex justify-center my-8">
            <button
              onClick={handlePaginationClick}
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded"
            >
              Load More
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
