import { useEffect, useState } from "react";

export default function Home() {
  // anggap state ini nyimpen data yang dikirim dari API
  const [data, setData] = useState(true);

  const [isMobile, setIsMobile] = useState({
    width: 0,
    height: 0,
    isMobile: false,
  });

  /** useState  : hooks react untuk membuat state ke functional component
   *  state     : variable yang dipakai untuk menyimpan data
   *  data      : state yang nyimpen nilai awal data
   *  setData   : fungsi untuk memperbaharui nilai data
   *  true      : (nilai bolean) tipe data dari nilai awal state data
   *  ketika setData dipanggil dengan nilai baru, react akan merender ulang komponen dengan nilai state yang baru
   */

  // fungsi untuk memperbaharui nilai state
  const handleChange = () => {
    // fungsi anonymous yang akan merybah nilai boolean dari true ke false lalu dari false ke true dan seterusnya
    setData((prevState) => !prevState);

    // mengubah state data dari nilai awal true menjadi false
    // setData(false);
  };

  useEffect(() => {
    // mounting
    setIsMobile({
      width: window.innerWidth,
      height: window.innerHeight,
      mobile: false,
    });
    window.addEventListener("resize", (event) => {
      // updating
      setIsMobile({
        width: event.target.innerWidth,
        height: event.target.innerHeight,
        mobile: window.innerWidth < 450 ? true : false,
      });
    });
    // unmounting
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  /** useEffect : hooks di react untuk menambahkan side effect ke state
   *  biasanya dipakai untuk memperbaharui data atau komponen ketika ada perubahan pada state
   *  [] (array kosong/dependency array : jika array kosong maka argumen tersebut untuk menjalankan useEffect sekali),
   *  [isMobile.mobile] jika ada state di dalam array tersebut, maka untuk memantau setiap perubahan pada state tersebut
   */

  console.log("w : ", isMobile.width);
  console.log("h : ", isMobile.height);

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center h-screen gap-4 ${
          data ? "bg-black" : "bg-white"
        } `}
      >
        {data ? (
          <h1 className="text-6xl font-bold text-white">DARK</h1>
        ) : (
          <h1 className="text-6xl font-bold">light</h1>
        )}
        <button
          onClick={handleChange}
          className="mt-4 p-4 bg-blue-500 text-white font-bold rounded"
        >
          change mode
        </button>
      </div>
    </>
  );
}
