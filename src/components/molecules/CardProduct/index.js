import Button from "@/components/atoms/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/** nested component : fungsinya sebagai wadah/container untuk beberapa komponen anak (header, body, footer)
 *  komponen ini akan jadi komponen pembungkus untuk children
 */

const CardProduct = ({ children }) => {
  return (
    <>
      <div className="rounded-lg bg-gradient-aigen shadow-xl p-1">
        <div className="w-full h-full max-w-xs bg-white rounded-lg">
          {children}
        </div>
      </div>
    </>
  );
};

function Header({ image }) {
  return (
    // <Link href="/products/[id]" as={`/products/${id}`}>
    <Link href="#">
      <Image
        src={image}
        alt="card image"
        width={300}
        height={300}
        className="p-4 rounded-t-lg w-full aspect-video object-contain"
      />
    </Link>
  );
}

function Body({ title, desc }) {
  return (
    <div className="px-5 pb-5">
      <Link href="#">
        <h3 className="text-3xl font-bold text-slate-900 truncate">{title}</h3>
        <p className="mt-3 text-slate-700 text-base text-justify line-clamp-2">
          {desc}
        </p>
      </Link>
    </div>
  );
}

function Footer({ price, handleAddToCart, id }) {
  return (
    <div className="border-0  flex flex-col item-center justify-center px-5 pb-5">
      <span className="text-2xl font-semibold mb-2 text-center">{price}</span>
      <Button
        onClick={() => handleAddToCart(id)}
        buttonClassName="w-full bg-gradient-aigen bg-gradient-aigen-hover"
      >
        Beli
      </Button>
    </div>
  );
}

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;
export default CardProduct;
