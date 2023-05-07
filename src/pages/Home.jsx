import React, { useEffect, useState } from "react";
import { productsData } from "../api/Api";
import Banner from "../components/Banner"; //
import Products from "../components/Products";
import Spinner from "../components/Spinner";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await productsData();
      if (data) {
        setProducts(data.products);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Banner />
      {loading ? <Spinner /> : <Products products={products} />}
    </div>
  );
};

export default Home;
