import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo/LogoDark";
import { user } from "../assets";

const Header = () => {
  const productData = useSelector((state) => state.clickShop.productData);
  const userInfo = useSelector((state) => state.clickShop.userInfo);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="w-full h-20 bg-white font-titleFont border-b-[1px] border-b-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between px-4 sm:px-8 md:px-16">
        <Link to="/">
          <div>
            <Logo />
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex item-center gap-8">
            <Link to="/">
              <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                Home
              </li>
            </Link>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Pages
            </li>
            <Link to="/shop">
              <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                Shop
              </li>
            </Link>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Element
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Blog
            </li>
          </ul>
          <Link to="/cart">
            <div className="cursor-pointer relative">
              <ShoppingCartIcon />
              <span className="">{productData.length}</span>
            </div>
          </Link>

          <Link to="/login">
            <img
              className="w-8 h-8 rounded-full"
              src={userInfo ? userInfo.image : user}
              alt="userLogo"
            />
          </Link>
          {/* 
          {userInfo && (
            <p className="text-base font-titleFont font-semibold underline underline-offset-2">
              {userInfo.name}
            </p>
          )} */}
        </div>
        <div className="md:hidden">
          <MenuIcon onClick={handleMenu} className="w-6 cursor-pointer" />
        </div>
      </div>
      {showMenu && (
        <div className="md:hidden bg-white">
          <ul className="flex flex-col items-center">
            <Link to="/">
              <li
                className="my-4 text-lg text-black font-bold hover:text-orange-900 hover:underline cursor-pointer duration-300"
                onClick={() => setShowMenu(false)}
              >
                Home
              </li>
            </Link>
            <li
              className="my-4 text-lg text-black font-bold hover:text-orange-900 hover:underline cursor-pointer duration-300"
              onClick={() => setShowMenu(false)}
            >
              Pages
            </li>
            <Link to="/shop">
              <li
                className="my-4 text-lg text-black font-bold hover:text-orange-900 hover:underline cursor-pointer duration-300"
                onClick={() => setShowMenu(false)}
              >
                Shop
              </li>
            </Link>
            <li
              className="my-4 text-lg text-black font-bold hover:text-orange-900 hover:underline cursor-pointer duration-300"
              onClick={() => setShowMenu(false)}
            >
              Element
            </li>
            <li
              className="my-4 text-lg text-black font-bold hover:text-orange-900 hover:underline cursor-pointer duration-300"
              onClick={() => setShowMenu(false)}
            >
              Blog
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
