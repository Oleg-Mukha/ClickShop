import { useEffect, useState } from "react";
import { getProductById } from "../api/Api";

const useProductDetailsHook = (productId) => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductById(productId);
      if (data) {
        setDetails(data);
      }
    };
    fetchData();
  }, [productId]);

  return details;
};

export default useProductDetailsHook;
