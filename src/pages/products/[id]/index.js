import { formatCurrency } from "@/helper/util/formatCurrency";
import { getProductsById } from "@/services/products";
import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";
import useSWR from "swr";

/** useSWR (stale while revalidate) : hooks third party dari tim vercel untuk fetching data, caching dan revalidate
 *   rumus : const { data, error, isLoading, isValidating } = useSWR(key(endpoint), dataFetcher)
 *   swr punya beberapa properti
 *   data : data yang diambil dari API
 *   error : error handling saat ambil data
 *   isLoading : status loading
 *   isValidating : status validasi ulang data (perbarui data)
 */
const ProductDetailPage = ({ detailProduct }) => {
  const api = process.env.NEXT_PUBLIC_API;

  const { data, error, isLoading, isValidating } = useSWR(
    `${api}/products/${detailProduct?.id}`,
    async () => {
      const res = await axios.get(`${api}/products/${detailProduct?.id}`);
      return res.data;
    },
    {
      initialData: detailProduct,
      refreshInterval: 1000, // refresh dalam interval tertentu (mili second)
    }
  );

  if (error) return <div className="h-screen text-8xl text-red-600 text-center">gagal ambil data</div>;

  return (
    <>
      <div className="flex flex-col px-5 py-5 bg-gradient-to-b from-black to-blue-900 min-h-screen">
        <h1 className="text-4xl font-bold text-white">Detail Produk</h1>
        {/* <div><Image /></div> */}
        <div className="pt-4 mt-5 rounded-xl bg-white bg-opacity-20 max-w-xl">
          <h2 className="text-2xl font-bold text-white">{data?.title}</h2>
          <p className="font-semibold text-white mt-5">{data?.description}</p>
          {isLoading && <div className="text-xl text-white text-center">sedang memuat data...</div>}
          <p className="font-bold text-white text-xl mt-5">{formatCurrency(data?.price, "en-US", "USD")}</p>
        </div>
        {isValidating && <p className="text-white mt-5 ">cek data.............</p>}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const id = context.query.id;
  const { query } = context;
  console.log(query.id);

  try {
    const detailProduct = await getProductsById(id);

    // validasi kalau semisal product tidak ditemukan, tampilkan 404
    if (!detailProduct) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        detailProduct,
      },
    };
  } catch (error) {
    // cara kedua 404 handling di level catch
    if ((error.response.data.status = 404)) {
      return {
        notFound: true,
      };
    }

    console.log(error);
    return {
      props: {
        error: "error",
      },
    };
  }
}

export default ProductDetailPage;
