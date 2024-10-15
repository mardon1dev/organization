import React from "react";
import Navlink from "./Navlink";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navlinks = [
    { name: "Tashkilot", link: "/" },
    { name: "Hamkorlar", link: "/hamkorlar" },
  ];
  return (
    <div className="w-[300px] bg-black h-screen sticky top-0 left-0">
      <nav className="w-full">
        <Link to="/" className="text-white px-[30px] py-[20px] block mb-10">Welcome</Link>
      </nav>
      <ul className="text-white flex flex-col w-full justify-center gap-5">
        {navlinks.map((item, index) => (
          <Navlink item={item} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
