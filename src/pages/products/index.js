import Button from "@/components/atoms/Button";
import CardProduct from "@/components/molecules/CardProduct";
import React, { useEffect, useState } from "react";

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

const ProductPage = () => {
  //useState sebutan variable di react (digunakan untuk data yang dinamis)
  const [username, setUsername] = useState("");

  // ngga bisa pakai cara biasa kayak ini
  let name = "danu";
  name = "dani";

  // useEffect untuk menangani side effect dari perubahan suatu data yang dijalankan tiap kali halaman dimuat (loading)
  useEffect(() => {
    const getUsername = localStorage.getItem("username");

    if (getUsername) {
      setUsername(getUsername);
    }
  }, []);
  /** ^ dependensi array : jika kosong, untuk memastikan kalau useEffect dijalankan tiap kali halaman dimuat
   * kalau ada state di dalam dependensi array maka fungsinya untuk memantau perubahan di state tersebut
   */

  useEffect(() => {
    if (username) {
      console.log("username adalah :", username);
    } else {
      console.log("username not found");
    }
  }, [username]);

  // event hanler untuk menjalankan fungsi logout dan menghapus data username dan password dari localStorage
  function handleLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "/login";
  }

  return (
    <>
      <div className="flex justify-between items-center bg-black text-white font-bold px-5 py-4">
        <h1 className="text-xl">Hi, {username}</h1>
        <Button
          onClick={handleLogout}
          buttonClassName={"bg-red-500 hover:bg-red-700"}
        >
          Logout
        </Button>
      </div>
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
    </>
  );
};

export default ProductPage;
