import Button from "@/components/atoms/Button";
import CardProduct from "@/components/molecules/CardProduct";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Icons from "@/components/atoms/icons";
import { getProducts } from "@/services/products";
import { useRouter } from "next/router";
import { useLogin } from "@/hooks/useLogin";
import { formatCurrency } from "@/helper/util/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/services/auth";
import { setIsLargeScreen, setUsername } from "@/redux/screenSlice/screenSlice";

// contoh data dari API/BE

const ProductPage = ({ data }) => {
  //useState sebutan variable di react (digunakan untuk data yang dinamis)
  // const [username, setUsername] = useState("");
  const [cart, setCart] = useState([]);
  const footerRef = useRef();
  const router = useRouter();

  const dispatch = useDispatch(); // untuk ngirim perubahan ke state global / akses state global di store
  const { isLargeScreen, username } = useSelector((state) => state.screen);

  useEffect(() => {
    const token = localStorage.getItem("token");

    //validasi token, cek kalo ngga ada token balikin ke login
    if (token) {
      dispatch(setUsername(getCurrentUser(token))); // contoh
    } else {
      router.push("/login");
      console.log("wallala : ", dispatch(setIsLargeScreen));
      console.log("wallala2 : ", dispatch(setUsername));
    }
  });

  // manggil custome hooks
  // const username = useLogin();

  const [ShowBackToTop, setShowBackToTop] = useState(false);
  /** useRef : hooks untuk membuat referensi ke elemen DOM/fungsi untuk mengakses elemen DOM*/

  // const [data, setData] = useState([]);

  // useEffect untuk menangani side effect dari perubahan suatu data yang dijalankan tiap kali halaman dimuat (loading)
  useEffect(() => {
    // ambil data dari localStorage lalu parsing, tambahin login
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

  /** useCallback : hooks buat nyimpen fungsi ke dalam cache,
   *  tujuannya biar fungsi tersebut ngga perlu dijalananin/dihitung ulang ketika tidak ada perubahan pada nilainya
   */
  const calculateTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const product = data?.find((product) => product.id === item.id);
      return total + product?.price * item.qty;
    }, 0);
  }, [cart, data]); // dependency array untuk memantau perubahan array

  // panggil fungsi useCallback buat dapetin nilai total
  const cartTotal = calculateTotal();

  /** useMemo : hooks buat nyimpen hasil komputasi (perhitungan) yang kompleks ke dalam cache,
   *  tujuannya biar fungsi tersebut ngga perlu dijalananin/dihitung ulang ketika tidak ada perubahan pada state
   */
  // const cartTotal = useMemo(() => {
  //   return cart.reduce((total, item) => {
  //     const product = data.find((product) => product.id === item.id);
  //     return total + product.price * item.qty;
  //   }, 0);
  // }, [cart]); // dependency array untuk memantau perubahan array`

  useEffect(() => {
    if (cart.length > 0) {
      // const sumTotal = cart.reduce((total, item) => {
      //   const product = data.find((product) => product.id === item.id);
      //   return total + product.price * item.qty;
      // }, 0);
      // setTotal(sumTotal);

      localStorage.setItem("cart", JSON.stringify(cart)); // untuk menyimpan data ke local storage
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
    localStorage.removeItem("token");
    localStorage.removeItem("token");

    router.push("/login");
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
        {isLargeScreen ? (
          <p className="text-lg">Desktop</p>
        ) : (
          <p className="text-lg">Mobile</p>
        )}
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
            {data?.map((item) => (
              <CardProduct key={item.id}>
                <CardProduct.Header image={item.image} />
                <CardProduct.Body title={item.title} desc={item.description} />
                <CardProduct.Footer
                  // price={item.price}
                  price={formatCurrency(item.price)}
                  handleAddToCart={handleAddToCart}
                  id={item.id}
                />
              </CardProduct>
            ))}
          </div>
        </div>

        {/* cart */}
        {cart.length > 0 && ( //akan ditampilkan jika cart ada isinya
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
                      className="rounded aspect-video object-contain"
                      src={datas?.image}
                      alt="cart"
                      width={100}
                      height={100}
                    />
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col justify-between ml-3">
                        <span className="font-bold text-xl line-clamp-1">
                          {datas?.title}
                        </span>
                        <span className="font-semibold">
                          {datas?.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </span>
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
              <span>{formatCurrency(cartTotal, "ja-JP", "JPY")}</span>
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

/** ISR : Incremental Static Regeneration adalah teknik menggabungkan SSR dan SSG,
 *  di mana halaman akan ditampilkan secara statis namun datanya bisa diupdate secara dinamis
 *  jika ada perubahan data
 */
export async function getStaticProps() {
  try {
    // cara pertama untuk manggil service satu persatu
    const products = await getProducts();

    // cara kedua kalau mau manggil beberpa service sekaligus pakai promise
    // const [products, user] = await Promise.all([getProducts(), getUser()]);
    // const sliceProducts = products.slice(0, 8);

    return {
      props: {
        // data: sliceProducts || [],
        data: products || [],
      },
      revalidate: 60, // <- fungsi untuk merefresh / mengupdate data setelah 60 detik
    };
  } catch (error) {
    console.log(error);
  }
}

export default ProductPage;
