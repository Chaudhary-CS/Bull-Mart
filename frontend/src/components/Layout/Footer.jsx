import React from "react";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillYoutube,
    AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
    footercompanyLinks,
    footerProductLinks,
    footerSupportLinks,
} from "../../static/data";

const Footer = () => {
    return (
        <div className="bg-gradient-to-br from-brand.black to-brand.dark text-white">
            <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-gradient-to-r from-brand.primary to-brand.forest py-7">
                <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
                    <span className="text-brand.neon">Join</span> the USF community{" "}
                    <br />
                    and reduce e-waste together
                </h1>
                <div>
                    <input
                        type="text"
                        required
                        placeholder="Enter your USF email..."
                        className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
                    />
                    <button className="bg-brand.neon hover:bg-brand.accent duration-300 px-5 py-2.5 rounded-md text-black font-semibold md:w-auto w-full">
                        Join
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
                <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand.neon to-brand.mint rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-brand.black font-bold text-2xl">B</span>
                        </div>
                        <div>
                            <h1 className="text-brand.neon text-3xl font-bold">Bull-</h1>
                            <h1 className="text-brand.mint text-3xl font-bold">Mart</h1>
                        </div>
                    </div>
                    <p className="text-gray-300">USF's student marketplace for sustainable trading and community building.</p>
                    <div className="flex items-center mt-[15px] space-x-4">
                        <AiFillFacebook size={25} className="cursor-pointer text-brand.neon hover:text-brand.mint transition-colors duration-300" />
                        <AiOutlineTwitter
                            size={25}
                            className="cursor-pointer text-brand.neon hover:text-brand.mint transition-colors duration-300"
                        />
                        <AiFillInstagram
                            size={25}
                            className="cursor-pointer text-brand.neon hover:text-brand.mint transition-colors duration-300"
                        />
                        <AiFillYoutube
                            size={25}
                            className="cursor-pointer text-brand.neon hover:text-brand.mint transition-colors duration-300"
                        />
                    </div>
                </ul>

                <ul className="text-center sm:text-start">
                    <h1 className="mb-1 font-semibold text-brand.neon">Company</h1>
                    {footerProductLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                className="text-gray-400 hover:text-brand.neon duration-300
                   text-sm cursor-pointer leading-6"
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="text-center sm:text-start">
                    <h1 className="mb-1 font-semibold text-brand.neon">Shop</h1>
                    {footercompanyLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                className="text-gray-400 hover:text-brand.neon duration-300
                   text-sm cursor-pointer leading-6"
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="text-center sm:text-start">
                    <h1 className="mb-1 font-semibold text-brand.neon">Support</h1>
                    {footerSupportLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                className="text-gray-400 hover:text-brand.neon duration-300
                   text-sm cursor-pointer leading-6"
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
            >
                <span>© 2024 Bull-Mart. USF Student Marketplace.</span>
                <span>Terms · Privacy Policy</span>
                <div className="sm:block flex items-center justify-center w-full">
                    <img
                        src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default Footer;