import React from 'react'
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";


const Hero = () => {
    return (
        <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex} bg-gradient-to-br from-brand.black via-brand.dark to-brand.black`}
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
                backgroundBlendMode: "overlay",
            }}
        >
            <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                <h1
                    className={`text-[35px] leading-[1.2] 800px:text-[60px] text-white font-[600] capitalize`}
                >
                    USF's Student <br /> Marketplace
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-gray-200">
                    Buy, sell, and trade with fellow Bulls. Save money, reduce waste, <br />
                    and build community. Everything from textbooks to furniture, <br />
                    electronics to USF gear - all within walking distance.
                </p>
                <Link to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                            Start Trading
                        </span>
                    </div>
                </Link>

            </div>

        </div>
    )
}

export default Hero