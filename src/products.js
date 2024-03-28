import axios from "axios";

export const gettopproducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/product/getall"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top products:", error);
    return []; // Return an empty array in case of an error
  }
};

// Using async-await
export const fetchProducts = async () => {
  const PRODUCTS = await gettopproducts();
  return PRODUCTS;
};
