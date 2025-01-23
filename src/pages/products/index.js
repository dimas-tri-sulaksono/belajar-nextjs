import CardProduct from "@/components/molecules/CardProduct";
import React from "react";

const ProductPage = () => {
  // contoh data dari API/BE
  const data = [
    {
      id: 1,
      image: "/images/sushi.jpeg",
      title: "Sushi",
      description: "Sushi enak",
      price: 123000,
    },
    {
      id: 2,
      image: "/images/sushi.jpeg",
      title: "Sushi",
      description: "Sushi mantap",
      price: 93000,
    },
    {
      id: 3,
      image: "/images/sushi.jpeg",
      title: "Sushi",
      description: "Sushi jago",
      price: 73000,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen gap-2">
      {/* nested component */}
      {/* <CardProduct>
        <CardProduct.Header image="/images/sushi.jpeg" />
        <CardProduct.Body title={"Sushi"} desc="Lorem ipsum dolor sit amet" />
        <CardProduct.Footer price={"Rp. 100.000"} />
      </CardProduct> */}

      {/* rendering list */}
      {/* teknik untuk menampilkan beberapa elemen UI tertentu berdasarkan data dinamis yang disimpan dalam sebuah JSON */}
      {data.map((item) => (
        <CardProduct key={item.id}>
          <CardProduct.Header image={item.image} />
          <CardProduct.Body title={item.title} desc={item.description} />
          <CardProduct.Footer price={item.price} />
        </CardProduct>
      ))}
    </div>
  );
};

export default ProductPage;
