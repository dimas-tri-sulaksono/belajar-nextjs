// import library axios untuk bikin request http
import axios from "axios";

const api = process.env.NEXT_PUBLIC_API;

// fungsi untuk mengambil semua data produk dari fake API
export const getProducts = async () => {
  // jalanin dalam block try catch
  try {
    // request GET ke url API pake axios.get
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/products`);

    // mengembalikan data produk yang disimpan dalam response
    return response.data;
  } catch (error) {
    // error handling
    throw new Error("failed to fetch data : ", error);
  }
};

export const getProductsById = async (id) => {
  try {
    const res = await axios.get(`${api}/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data : ", error);
  }
};
