import React from "react";

/** props children :
 *  properti yang digunakan untuk mengirim komponen anak (child) ke dalam induk (parent)
 *  contoh ini Card adalah komponen parent sebagai wrapper
 *  child adalah komponen yang ada di dalam komponen parent <Card>{komponen Child}</Card>
 */

const Card = ({ children, cardClassname }) => {
  return (
    <div className={`bg-white rounded-lg shadow w-[300px] ${cardClassname}`}>
      {children}
    </div>
  );
};

export default Card;
