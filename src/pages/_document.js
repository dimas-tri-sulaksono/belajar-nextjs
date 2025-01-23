import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
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
