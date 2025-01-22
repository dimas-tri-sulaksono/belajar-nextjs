import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/** file _document.js dibuat otomatis di folder /src
 * fungsinya untuk menyesuaikan atau menambahkan informasi tamnbahan ke project kita
 * strukturnya seperti <head></head> pada HTML
 *
 * kapan digunakannya?
 * 1. saat mau menambahkan elemeny ke dalam <head></head> yang berlaku untuk seluruh halaman atau (global), kayak inject tag <script></script>, install google analytic, google tag manager dll
 * 2. saat enerapkan konfigurasi SEO (search engine optimization)
 * 3.
 */
