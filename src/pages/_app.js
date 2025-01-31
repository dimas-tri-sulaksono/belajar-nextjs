import { isMobileScreenAtom } from "@/atoms/atoms";
import {
  setIsMobileScreen,
  setIsLargeScreen,
} from "@/redux/screenSlice/screenSlice";
import store from "@/redux/store";
import "@/styles/globals.css";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  // coba atom
  // useSetAtom : untuk memperbaharui nilai state
  const setIsMobileScreenAtom = useSetAtom(isMobileScreenAtom);

  useEffect(() => {
    function handleResize() {
      // dispatch : untuk mengirim aksi yang memicu pembaruan nilai state
      store.dispatch(setIsMobileScreen(window.innerWidth < 768));
      store.dispatch(setIsLargeScreen(window.innerWidth >= 1240));

      // coba atom
      setIsMobileScreenAtom(window.innerWidth < 768);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

/** file _app.js diuat ototmatis oleh nextjs
 * fungsinya untuk menerapkan prilaku/elemen global yang dibutuhkan semua halaman/aplikasi nextje
 * 1. untuk mengatur layout global
 * 2. mengelola state global
 * 3. menggunakan css global yang berlaku di semu halaman
 */
