import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center text-center mt-20 text-[#F0F0F0]">
      <h1 className="text-[180px] font-black leading-none tracking-[-5px] text-[#F2890F]"
          style={{ fontVariantNumeric: "lining-nums proportional-nums" }}
      >
        404
      </h1>
      <p className="text-xl font-medium mt-4">Ой, такої сторінки немає</p>
      <Link
        to="/"
        className="mt-8 bg-[#F2890F] text-[#F0F0F0] py-[22px] px-10 rounded-[65px] font-extrabold uppercase tracking-wide transition hover:bg-[#d9780c] cursor-pointer"
      >
        Повернутися на головну
      </Link>
    </div>
  );
}

export default NotFound;