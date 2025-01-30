// import library axios untuk bikin request http
import axios from "axios";

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
