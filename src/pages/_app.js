import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

/** file _app.js diuat ototmatis oleh nextjs
 * fungsinya untuk menerapkan prilaku/elemen global yang dibutuhkan semua halaman/aplikasi nextje
 * 1. untuk mengatur layout global
 * 2. mengelola state global
 * 3. menggunakan css global yang berlaku di semu halaman
 */