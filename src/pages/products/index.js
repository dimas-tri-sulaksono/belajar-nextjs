import Button from "@/components/atoms/Button";
import CardProduct from "@/components/molecules/CardProduct";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { data } from "@/constant/products";
import BackToTopButton from "@/components/atoms/icons/BackToTopButton";
import Icons from "@/components/atoms/icons";

// contoh data dari API/BE

const ProductPage = () => {
  //useState sebutan variable di react (digunakan untuk data yang dinamis)
  const [username, setUsername] = useState("");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState([]);
  const footerRef = useRef();
  const [ShowBackToTop, setShowBackToTop] = useState(false);

  /** useRef : hooks untuk membuat referensi ke elemen DOM/fungsi untuk mengakses elemen DOM
   */
  // ngga bisa pakai cara biasa kayak ini
  // let name = "danu";
  // name = "dani";

  // useEffect untuk menangani side effect dari perubahan suatu data yang dijalankan tiap kali halaman dimuat (loading)
  useEffect(() => {
    const getUsername = localStorage.getItem("username");

    if (getUsername) {
      setUsername(getUsername);
    }

    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);
  /** ^ dependensi array : jika kosong, untuk memastikan kalau useEffect dijalankan tiap kali halaman dimuat
   * kalau ada state di dalam dependensi array maka fungsinya untuk memantau perubahan di state tersebut
   */

  // fungsi untuk menambahkan produk ke keranjang
  const handleAddToCart = (id) => {
    // setCart([{ id: id, qty: 1 }]);

    //logic unruk mengecek kalau produk dengan id yang sama ditambahkan leih dari satu maka akan menambah jumlah qty +1
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      // jika fungsi cuma sekali ditrigger maka cuma menambahkan satu produk doang ke cart
      setCart([...cart, { id, qty: 1 }]);
    }
  };
  // console.log(cart);

  /** useMemo : hooks buat nyimpen hasil komputasi (perhitungan) yang kompleks ke dalam cache,
   *  tujuannya biar fungsi tersebut ngga perlu dijalananin/dihitung ulang ketika tidak ada perubahan pada state
   */
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const product = data.find((product) => product.id === item.id);
      return total + product.price * item.qty;
    }, 0);
  }, [cart]); // dependency array untuk memantau perubahan array

  useEffect(() => {
    if (cart.length > 0) {
      // const sumTotal = cart.reduce((total, item) => {
      //   const product = data.find((product) => product.id === item.id);
      //   return total + product.price * item.qty;
      // }, 0);
      // setTotal(sumTotal);
      // //
      // localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // useEffect(() => {
  //   if (username) {
  //     console.log("username adalah :", username);
  //   } else {
  //     console.log("username not found");
  //   }
  // }, [username]);

  // event hanler untuk menjalankan fungsi logout dan menghapus data username dan password dari localStorage
  function handleLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "/login";
  }

  useEffect(() => {
    function handleScroll() {
      // ambil nilai offsetTop (posisi vertikal) dari elemen footer yang direferensikan oleh footerRef
      const footerTop = footerRef.current.offsetTop; // ambil batas atas komponen

      // ambil tinggi dari iinerHeight dari object window (tinggi viewport tanpa toolbar dan scrollbar)
      const viewportHeight = window.innerHeight;

      // ambil nilai scrollY dari object window (posisi scroll vertika [sumbu Y] di layar)
      const scrollPosition = window.scrollY;

      // logic untuk mengecek apakah posisi scroll di layar telah mencapai elemen footer
      if (scrollPosition + viewportHeight >= footerTop) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    }
    // event listener untuk menjalankan fungsi handleScroll setiap event scroll terjadi
    window.addEventListener("scroll", handleScroll);

    // unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [footerRef]); // jalanin side effect ini tiap kali nilai footerRef berubah

  function handleBackToTop() {
    //balikin scroll ke atas dengan animasi smooth
    // window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  return (
    <>
      <div className="flex justify-between bg-black text-white font-bold px-5 py-4">
        <h1 className="text-xl">Hi, {username}</h1>
        <Button
          onClick={handleLogout}
          buttonClassName={"bg-red-500 hover:bg-red-700"}
        >
          Logout
        </Button>
      </div>
      <div className="flex justify-between px-5 py-8">
        {/* products */}
        <div className="flex flex-col w-3/4">
          <h1 className="text-3xl font-bold text-blue-500 uppercase mb-4">
            products
          </h1>
          <div className="flex flex-wrap gap-4">
            {data.map((item) => (
              <CardProduct key={item.id}>
                <CardProduct.Header image={item.image} />
                <CardProduct.Body title={item.title} desc={item.description} />
                <CardProduct.Footer
                  price={item.price}
                  handleAddToCart={handleAddToCart}
                  id={item.id}
                />
              </CardProduct>
            ))}
          </div>
        </div>

        {/* cart */}
        {cart.length > 0 && (
          <div className="w-1/4">
            <h1 className="text-3xl font-bold text-blue-500 mb-4 uppercase">
              Cart
            </h1>
            <div className="flex flex-col gap-2">
              {cart.map((item) => {
                const datas = data.find((data) => data.id === item.id);
                return (
                  <div className="flex p-4 border rounded-lg" key={item.id}>
                    <Image
                      className="rounded"
                      src={datas.image}
                      alt="cart"
                      width={100}
                      height={100}
                    />
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col justify-between ml-3">
                        <span className="font-bold text-xl">{datas.title}</span>
                        <span className="font-semibold">{datas.price}</span>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <span className="mb-1">Qty</span>
                        <span className="flex justify-center items-center font-semibold p-2 border rounded-sm text-center w-10 h-10">
                          {item.qty}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between px-4 py-2 border mt-2 font-semibold rounded-lg">
              <span>Total</span>
              <span>{cartTotal}</span>
            </div>
          </div>
        )}
      </div>

      {/* footer */}
      {ShowBackToTop && (
        <div
          onClick={handleBackToTop}
          className=" text-white fixed bottom-20 right-5 bg-gradient-aigen-hover rounded-full p-3"
        >
          <Icons.DoubleArrowUp />
        </div>
      )}
      <footer
        ref={footerRef}
        className="text-center p-5 bg-black text-white w-full"
      >
        All right reserved &copy; || by Dimas
      </footer>
    </>
  );
};

export default ProductPage;
