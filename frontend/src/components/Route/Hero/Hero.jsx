import React from 'react'
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";


const Hero = () => {
    return (
        <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full ${styles.noramlFlex} bg-gradient-to-br from-brand.black via-brand.dark to-brand.black overflow-hidden`}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 bg-brand.neon rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-brand.mint rounded-full blur-lg animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-brand.primary rounded-full blur-md animate-pulse delay-500"></div>
            </div>
            <div className={`${styles.section} w-[90%] 800px:w-[60%] relative z-10`}>
                <div className="mb-4">
                    <span className="text-brand.neon text-sm font-medium tracking-wider uppercase">Welcome to</span>
                </div>
                <h1
                    className={`text-[35px] leading-[1.2] 800px:text-[60px] text-white font-[700] capitalize mb-6`}
                >
                    <span className="text-brand.neon">USF's</span> Student <br /> 
                    <span className="bg-gradient-to-r from-brand.neon to-brand.mint bg-clip-text text-transparent">Marketplace</span>
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-gray-300 leading-relaxed max-w-2xl">
                    Buy, sell, and trade with fellow Bulls. Save money, reduce waste, <br />
                    and build community. Everything from textbooks to furniture, <br />
                    electronics to USF gear - all within walking distance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link to="/products" className="inline-block">
                        <div className="bg-brand.neon hover:bg-brand.accent transition-all duration-300 px-8 py-3 rounded-lg text-black font-semibold text-lg shadow-lg hover:shadow-brand.neon/25">
                            Start Trading
                        </div>
                    </Link>
                    <Link to="/shop-create" className="inline-block">
                        <div className="border-2 border-brand.neon hover:bg-brand.neon hover:text-black transition-all duration-300 px-8 py-3 rounded-lg text-brand.neon font-semibold text-lg">
                            Sell Your Items
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Hero