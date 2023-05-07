import axios from "axios";

export async function productsData() {
  try {
    const products = await axios.get("https://dummyjson.com/products");
    return products.data
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function paginationData(limit) {
  try {
    const products = await axios.get(`https://dummyjson.com/products?limit=${limit}`);
    return products.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getProductById = async (id) => {
  try {
    const product = await axios.get(`https://dummyjson.com/products/${id}`);
    return product.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
