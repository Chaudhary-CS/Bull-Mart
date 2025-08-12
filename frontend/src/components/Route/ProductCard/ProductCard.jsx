import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
    AiFillHeart,
    AiFillStar,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineMessage,
    AiOutlineStar,
    AiOutlineClockCircle,
    AiOutlineUser,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';
import { toast } from 'react-toastify';
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.user);
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (wishlist && wishlist.find((i) => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist]);

    // Remove from wish list 
    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    }

    // add to wish list
    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data))
    }

    // Contact seller
    const contactSeller = () => {
        if (!user) {
            toast.error("Please login to contact seller!");
            return;
        }
        
        const contactInfo = data.contactInfo;
        const method = data.contactMethod;
        
        if (method === "Phone") {
            window.open(`tel:${contactInfo}`);
        } else if (method === "Email") {
            window.open(`mailto:${contactInfo}`);
        } else if (method === "WhatsApp") {
            window.open(`https://wa.me/${contactInfo.replace(/\D/g, '')}`);
        } else {
            // Copy contact info to clipboard
            navigator.clipboard.writeText(contactInfo);
            toast.success("Contact info copied to clipboard!");
        }
    }

    // Get condition badge color
    const getConditionColor = (condition) => {
        switch (condition) {
            case "New": return "bg-green-500";
            case "Like New": return "bg-blue-500";
            case "Good": return "bg-yellow-500";
            case "Fair": return "bg-orange-500";
            case "Poor": return "bg-red-500";
            default: return "bg-gray-500";
        }
    }

    // Format time ago
    const getTimeAgo = (date) => {
        const now = new Date();
        const created = new Date(date);
        const diffInHours = Math.floor((now - created) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return "Just now";
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
        return `${Math.floor(diffInHours / 168)}w ago`;
    }

    return (
        <>
            <div className='w-full h-[420px] bg-gray-800 rounded-lg shadow-lg p-3 relative cursor-pointer border border-gray-700 hover:border-green-400 hover:shadow-green-400/20 transition-all duration-300 group'>
                {/* Status Badge */}
                <div className='absolute top-2 left-2 z-10'>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${getConditionColor(data.condition)}`}>
                        {data.condition}
                    </span>
                </div>

                {/* Negotiable Badge */}
                {data.negotiable && (
                    <div className='absolute top-2 right-2 z-10'>
                        <span className='px-2 py-1 text-xs font-semibold rounded-full text-white bg-purple-500'>
                            Negotiable
                        </span>
                    </div>
                )}

                <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                    <img
                        src={`${backend_url}${data.images && data.images[0]}`}
                        alt="item"
                        className='w-full h-[170px] object-contain rounded-md'
                    />
                </Link>

                <Link to={`/product/${data._id}`}>
                    <h4 className='pb-2 font-[500] text-white group-hover:text-green-400 transition-colors duration-300'>
                        {data.title.length > 40 ? data.title.slice(0, 40) + '...' : data.title}
                    </h4>

                    {/* Seller Info */}
                    <div className='flex items-center gap-2 pb-2'>
                        <AiOutlineUser className='text-gray-400' size={16} />
                        <span className='text-sm text-gray-300'>{data.seller?.name}</span>
                        {data.seller?.rating > 0 && (
                            <div className='flex items-center gap-1'>
                                <AiFillStar className='text-yellow-400' size={12} />
                                <span className='text-xs text-gray-400'>{data.seller.rating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div className='text-sm text-gray-400 pb-2'>
                        📍 {data.location}
                    </div>

                    {/* Price */}
                    <div className='py-2 flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <h5 className='text-lg font-bold text-green-400'>
                                ${data.price}
                            </h5>
                            {data.negotiable && (
                                <span className='text-xs text-gray-400'>or best offer</span>
                            )}
                        </div>

                        <div className='flex items-center gap-1 text-xs text-gray-400'>
                            <AiOutlineEye size={14} />
                            <span>{data.views || 0}</span>
                        </div>
                    </div>

                    {/* Posted Time */}
                    <div className='flex items-center gap-1 text-xs text-gray-500 pb-2'>
                        <AiOutlineClockCircle size={12} />
                        <span>{getTimeAgo(data.createdAt)}</span>
                    </div>
                </Link>

                {/* Action Buttons */}
                <div className='absolute right-2 top-2 flex flex-col gap-2'>
                    {/* Wishlist Button */}
                    {click ? (
                        <AiFillHeart
                            size={20}
                            className="cursor-pointer text-red-500 hover:text-red-400 transition-colors duration-300"
                            onClick={() => removeFromWishlistHandler(data)}
                            title='Remove from favorites'
                        />
                    ) : (
                        <AiOutlineHeart
                            size={20}
                            className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-300"
                            onClick={() => addToWishlistHandler(data)}
                            title='Add to favorites'
                        />
                    )}

                    {/* Contact Seller Button */}
                    <AiOutlineMessage
                        size={20}
                        className="cursor-pointer text-gray-400 hover:text-green-400 transition-colors duration-300"
                        onClick={contactSeller}
                        title={`Contact via ${data.contactMethod}`}
                    />

                    {/* Quick View Button */}
                    <AiOutlineEye
                        size={20}
                        className="cursor-pointer text-gray-400 hover:text-green-400 transition-colors duration-300"
                        onClick={() => setOpen(!open)}
                        title='Quick view'
                    />
                </div>

                {/* Quick View Modal */}
                {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
            </div>
        </>
    )
}

export default ProductCard