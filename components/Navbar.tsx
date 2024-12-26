import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="flex justify-between px-10 py-5 md:px-36  mx-auto">
      <Link href={"/"} className="text-3xl font-bold hover:text-yellow-800 duration-200 underline">
        Sanity Blog
      </Link>

      <nav>
        <ul className="flex gap-6">
          <li className="hover:underline font-bold  hover:text-cyan-600  duration-200 text-xl cursor-pointer">About</li>
          <li className="hover:underline  font-bold hover:text-cyan-600 duration-200 text-xl cursor-pointer">Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
