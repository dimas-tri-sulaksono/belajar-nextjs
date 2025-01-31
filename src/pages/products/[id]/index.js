import { formatCurrency } from "@/helper/util/formatCurrency";
import { getProductsById } from "@/services/products";
import { notFound } from "next/navigation";
import React from "react";

const ProductDetailPage = ({ detailProduct }) => {
  console.log(detailProduct);
  return (
    <>
      <div className="flex flex-col px-5 py-5 bg-gradient-to-b from-black to-blue-900 min-h-screen">
        <h1 className="text-4xl font-bold text-white">Detail Produk</h1>
        {/* <div><Image /></div> */}
        <div className="pt-4 mt-5 rounded-xl bg-white bg-opacity-20 max-w-xl">
          <h2 className="text-2xl font-bold text-white">{detailProduct?.title}</h2>
          <p className="font-semibold text-white mt-5">{detailProduct?.description}</p>
          <p className="font-bold text-white text-xl mt-5">{formatCurrency(detailProduct?.price, "en-US", "USD")}</p>
        </div>
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
