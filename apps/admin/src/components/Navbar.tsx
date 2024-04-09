import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Icons } from "ui";

interface NavbarProps {
  navItems: {
    title: string;
    href: string;
  }[];
}

const Navbar = ({ navItems }: NavbarProps) => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;
  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  console.log({ pathname });
  return (
    <div className="mx-auto flex h-24  items-center justify-between bg-black px-4 text-white">
      {/* Logo */}
      <Link href="/">
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">Academy Dashboard</h1>
      </Link>
      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`m-2 cursor-pointer rounded-xl p-4 duration-300 ${
              pathname === item.href
                ? "bg-[#00df9a] text-black"
                : "hover:bg-[#00df9a] hover:text-black"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <Icons.hamburger_menu_close size={20} /> : <Icons.hamburger_menu size={20} />}
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
