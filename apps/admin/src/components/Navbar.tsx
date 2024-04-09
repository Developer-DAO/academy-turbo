import Link from "next/link";
import React, { useState } from "react";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

interface NavbarProps {
  navItems: {
    title: string;
    href: string;
  }[];
}

const Navbar = ({ navItems }: NavbarProps) => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items

  return (
    <div className="mx-auto flex h-24  items-center justify-between bg-black px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">Academy Dashboard</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="m-2 cursor-pointer rounded-xl p-4 duration-300 hover:bg-[#00df9a] hover:text-black"
          >
            {item.title}
          </Link>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {/* {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />} */}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed left-0 top-0 h-full w-[60%] border-r border-r-gray-900 bg-[#000300] duration-500 ease-in-out md:hidden"
            : "fixed bottom-0 left-[-100%] top-0 w-[60%] duration-500 ease-in-out"
        }
      >
        {/* Mobile Logo */}
        <h1 className="m-4 w-full text-3xl font-bold text-[#00df9a]">REACT.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="cursor-pointer rounded-xl border-b border-gray-600 p-4 duration-300 hover:bg-[#00df9a] hover:text-black"
          >
            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
