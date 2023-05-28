import { useState, useEffect } from "react";
import ProductsCard from "../components/ProductsCard";
import { paginationData } from "../api/Api";
import Spinner from "../components/Spinner";
import RoundedPriceProvider from "../context/RoundedPriceProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setCategory,
  setProductList,
  setCategories,
} from "../redux/clickShopSlice";

const Shop = () => {
  const dispatch = useDispatch();

  const query = useSelector((state) => state.clickShop.query);
  const category = useSelector((state) => state.clickShop.category);
  const productList = useSelector((state) => state.clickShop.productList);
  const categories = useSelector((state) => state.clickShop.categories);

  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await paginationData(limit);
      if (data) {
        const filteredProductList = data.products.filter(
          (product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) &&
            product.category.toLowerCase().includes(category.toLowerCase())
        );
        dispatch(setProductList(filteredProductList));

        const categoriesSet = new Set();
        filteredProductList.forEach((product) =>
          categoriesSet.add(product.category)
        );
        dispatch(setCategories(Array.from(categoriesSet)));
      }
      setLoading(false);
    };
    fetchData();
  }, [query, category, limit, dispatch]);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    dispatch(setQuery(newQuery));
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    dispatch(setCategory(newCategory));
  };

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
                onChange={handleQueryChange}
              />
            </div>
            <div>
              <select
                className="border border-gray-500 rounded p-2 w-full sm:w-60 my-2 md:w-80 lg:w-96"
                value={category}
                onChange={handleCategoryChange}
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
