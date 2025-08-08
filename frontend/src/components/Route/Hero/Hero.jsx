import React from 'react'
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";


const Hero = () => {
    return (
        <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full ${styles.noramlFlex} bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden`}
            style={{
                background: 'linear-gradient(135deg, #000000 0%, #111827 50%, #000000 100%)'
            }}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-green-500 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-600 rounded-full blur-md animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            <div className={`${styles.section} w-[90%] 800px:w-[60%] relative z-10`}>
                <div className="mb-4">
                    <span className="text-green-400 text-sm font-medium tracking-wider uppercase">Welcome to</span>
                </div>
                <h1
                    className={`text-[35px] leading-[1.2] 800px:text-[60px] text-white font-[700] capitalize mb-6`}
                >
                    <span className="text-green-400">USF's</span> Student <br /> 
                    <span style={{background: 'linear-gradient(45deg, #4ade80, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Marketplace</span>
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-gray-300 leading-relaxed max-w-2xl">
                    Buy, sell, and trade with fellow Bulls. Save money, reduce waste, <br />
                    and build community. Everything from textbooks to furniture, <br />
                    electronics to USF gear - all within walking distance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link to="/products" className="inline-block">
                        <div className="bg-green-400 hover:bg-green-500 transition-all duration-300 px-8 py-3 rounded-lg text-black font-semibold text-lg shadow-lg hover:shadow-green-400/25">
                            Start Trading
                        </div>
                    </Link>
                    <Link to="/shop-create" className="inline-block">
                        <div className="border-2 border-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 px-8 py-3 rounded-lg text-green-400 font-semibold text-lg">
                            Sell Your Items
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Hero