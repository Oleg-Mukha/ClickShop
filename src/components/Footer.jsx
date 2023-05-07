import React from "react";
import { ImGithub } from "react-icons/im";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHome,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsPersonFill, BsPaypal } from "react-icons/bs";
import { paymentLogo } from "../assets";
import Logo from "./Logo/Logo";
import DebugRouter from "./Debug/DebugWindow";

const Footer = () => {
  return (
    <div className="bg-black text-[#949494] py-20 font-titleFont mt-10 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 px-8 md:grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-0 md:gap-x-10">
        <div className="flex flex-col gap-7">
          <Logo style={{ fill: "#fff" }} />
          <img className="w-56" src={paymentLogo} alt="paymentLogo" />
          <div className="flex gap-5 text-lg text-gray-400">
            <ImGithub className="hover:text-white duration-300 cursor-pointer" />
            <FaYoutube className="hover:text-white duration-300 cursor-pointer" />
            <FaFacebookF className="hover:text-white duration-300 cursor-pointer" />
            <FaTwitter className="hover:text-white duration-300 cursor-pointer" />
            <FaInstagram className="hover:text-white duration-300 cursor-pointer" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">locate us</h2>
          <div className="text-base flex flex-col gap-2">
            <p>Machu Picchu, Peru</p>
            <p>
              Mobile: <a href="tel:+44 20 7123 4567">+44 20 7123 4567</a>
            </p>
            <p>
              Phone: <a href="tel:+61 2 1234 5678">+61 2 1234 5678</a>
            </p>
            <p>
              Email: <a href="mailto:info@clickShop.com">info@clickShop.com</a>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">profile</h2>
          <div className="text-base flex flex-col gap-2">
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <BsPersonFill />
              </span>
              my account
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <BsPaypal />
              </span>
              checkout
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <FaHome />
              </span>
              order tracking
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <MdLocationOn />
              </span>
              help & support
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            leave your email and we'll get shortly
          </h2>
          <input
            className="bg-transparent border px-4 py-2 text-sm mb-2 md:mb-0 md:mr-2 lg:mr-0 lg:mb-0"
            type="text"
            placeholder="e-mail"
          />
          <button className="text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black mb-2 md:mb-0 md:mr-2 lg:mr-0 lg:mb-0">
            Subscribe
          </button>
          <DebugRouter />
        </div>
      </div>
    </div>
  );
};

export default Footer;
