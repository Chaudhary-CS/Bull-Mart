import React from 'react'
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from '../../../styles/styles'

const Categories = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={`${styles.section}  hidden sm:block `}>
                <div
                    className={`branding my-12 flex justify-between w-full shadow-lg bg-gray-800 border border-gray-700 p-5 rounded-lg hover:border-green-400 transition-all duration-300`}
                >
                    {brandingData &&
                        brandingData.map((i, index) => (
                            <div className='flex items-start' key={index}>
                                {i.icon}
                                <div className='px-3'>
                                    <h3 className='font-bold text-sm md:text-base text-green-400'>{i.title}</h3>
                                    <p className="text-xs md:text-sm text-gray-300">{i.Description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* categories */}
            <div
                className={`${styles.section} bg-gray-800 border border-gray-700 p-6 rounded-lg mb-12`}
                id="categories"
            >
                <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
                    {
                        categoriesData &&
                        categoriesData.map((i) => {
                            const handleSubmit = (i) => {
                                navigate(`/products?category=${i.title}`);
                            }
                            return (
                                <div
                                    className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden bg-gray-700 rounded-lg p-3 hover:bg-gray-600 hover:border-green-400 border border-gray-600 transition-all duration-300"
                                    key={i.id}
                                    onClick={() => handleSubmit(i)}
                                >
                                    <h5 className={`text-[18px] leading-[1.3] text-white hover:text-green-400 transition-colors duration-300`}>{i.title}</h5>
                                    <img
                                        src={i.image_Url}
                                        className="w-[120px] object-cover"
                                        alt="catagory"
                                    />
                                </div>
                            )
                        })
                    }
                </div>

            </div>




        </>
    )
}

export default Categories