import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

const NavbarMobile = ({ navItem, Boolean }) => {
  const [toggleNav, setToggleNav] = useState(true);
  let navToggle = Boolean;
  return (
    <div
      className={`bg-white fixed ${
        navToggle === toggleNav ? "w-0 px-0 -left-8" : "w-full"
      }  h-screen top-0 left-0 overflow-hidden  duration-100 flex flex-col items-start justify-start  py-8 px-4`}
    >
      <button
        className=" flex items-center justify-center uppercase text-2xl font-medium"
        onClick={() => {
          setToggleNav(!toggleNav);
        }}
      >
        <AiOutlineClose />
        <h3 className=" ml-4">close</h3>
      </button>
      <ul className=" w-full  flex flex-col gap-4  mt-36">
        {navItem?.map((item, i) => {
          return (
            <li
              className=" w-full text-center uppercase text-3xl font-medium"
              key={i}
              onClick={() => {
                setToggleNav(!toggleNav);
              }}
            >
              <Link href={`${item === "home" ? "/" : `/#${item}`}`}>
                {item}
              </Link>
            </li>
          );
        })}
      </ul>

      
    </div>
  );
};

export default NavbarMobile;
