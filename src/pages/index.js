import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [data, setData] = useState(true);
  const username = useLogin();
  const { isMobileScreen } = useSelector((state) => state.screen);
  // console.log("mobile : ", isMobileScreen);

  const handleChange = () => {
    // fungsi anonymous yang akan merybah nilai boolean dari true ke false lalu dari false ke true dan seterusnya
    setData((prevState) => !prevState);

    // mengubah state data dari nilai awal true menjadi false
    // setData(false);
  };

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

        {isMobileScreen && (
          <p className="text-red-500 font-bold text-6xl">TEST</p>
        )}
        <button
          onClick={handleChange}
          className="mt-4 p-4 bg-blue-500 text-white font-bold rounded"
        >
          change mode
        </button>

        <p>{username}</p>
      </div>
    </>
  );
}
