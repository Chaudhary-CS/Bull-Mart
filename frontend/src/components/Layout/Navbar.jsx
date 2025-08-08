import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'


const Navbar = ({ active }) => {
    return (
        <div className={`block 800px:${styles.noramlFlex}`}>
            {navItems.map((i, index) => (
                <div className='flex' key={i.title}>
                    <Link
                        to={i.url}
                        className={`${active === index + 1 ? "text-green-400 font-semibold" : "text-gray-300 hover:text-green-500"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer transition-all duration-300 relative group`}
                    >
                        {i.title}
                        {active === index + 1 && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 rounded-full"></div>
                        )}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 rounded-full group-hover:w-full transition-all duration-300"></div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Navbar