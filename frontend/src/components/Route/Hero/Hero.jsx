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
                    <span className="text-green-400 text-sm font-medium tracking-wider uppercase">USF Student Community</span>
                </div>
                
                <h1
                    className={`text-[35px] leading-[1.2] 800px:text-[60px] text-white font-[700] capitalize mb-6`}
                >
                    <span className="text-green-400">Bulls-Mart</span> <br /> 
                    <span style={{background: 'linear-gradient(45deg, #4ade80, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Peer-to-Peer</span> <br />
                    <span className="text-white">Marketplace</span>
                </h1>
                
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-gray-300 leading-relaxed max-w-2xl">
                    Connect with fellow USF students to buy, sell, and trade items. <br />
                    From textbooks and electronics to furniture and USF gear - <br />
                    everything you need, right on campus. Save money, reduce waste, <br />
                    and build lasting connections with your Bull community.
                </p>

                {/* Key Features */}
                <div className="flex flex-wrap gap-4 mt-6 mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        No fees or commissions
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Direct student-to-student
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Safe campus transactions
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link to="/products" className="inline-block">
                        <div className="bg-green-400 hover:bg-green-500 transition-all duration-300 px-8 py-4 rounded-lg text-black font-semibold text-lg shadow-lg hover:shadow-green-400/25 transform hover:scale-105">
                            🔍 Browse Items
                        </div>
                    </Link>
                    <Link to="/shop-create" className="inline-block">
                        <div className="border-2 border-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 px-8 py-4 rounded-lg text-green-400 font-semibold text-lg transform hover:scale-105">
                            📝 List Your Item
                        </div>
                    </Link>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-gray-700">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">500+</div>
                        <div className="text-sm text-gray-400">Active Listings</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">1,200+</div>
                        <div className="text-sm text-gray-400">USF Students</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">$50K+</div>
                        <div className="text-sm text-gray-400">Saved by Students</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero