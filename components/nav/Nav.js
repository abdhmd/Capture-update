import React, { useState } from "react";
import { TbMenu } from "react-icons/tb";
import Link from "next/link";
import NavbarMobile from "./NavbarMobile";
import { Button } from "../content-styles/ContentStyles";


const Nav = ({navItem}) => {
  const [toggleNav, setToggleNav] = useState(true);
  return (
    <nav className="w-full">
      <div className="flex flex-row w-full justify-between items-center p-4 md:px-8 lg:px-16 lg:py-6 xl:px-24">
        <div className="text-2xl uppercase font-bold">
          <Link href="/">Ca </Link>
        </div>
        <ul className="hidden md:flex   text-center justify-end gap-6 text-gray-700  w-full  ">
          {navItem?.map((item, i) => {
            return (
              <li
                className="  text-center uppercase text-sm font-medium   "
                key={i}
              >
                <Link href={`${item === "home" ? "/" : `/#${item}`}`}>
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* <Button  props = "hidden md:flex"> 
          <Link href="/#subscribe">subscribe</Link>
        </Button> */}
        <button
          className="text-2xl md:hidden lg:hidden"
          onClick={() => {
            setToggleNav(!toggleNav);
          }}
        >
          <TbMenu />
        </button>
      </div>
      <NavbarMobile navItem={navItem} Boolean={toggleNav ? true : false} />
    </nav>
  );
};

export default Nav;
