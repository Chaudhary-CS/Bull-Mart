import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
    AiFillHeart,
    AiFillStar,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineStar,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';
import { addTocart } from '../../../redux/actions/cart';
import { toast } from 'react-toastify';
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
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

    // Add to cart
    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);

        if (isItemExists) {
            toast.error("item already in cart!")
        } else {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: 1 };
                dispatch(addTocart(cartData));
                toast.success("Item added to cart Successfully!")
            }
        }
    }


    return (
        <>
            <div className='w-full h-[370px] bg-gray-800 rounded-lg shadow-lg p-3 relative cursor-pointer border border-gray-700 hover:border-green-400 hover:shadow-green-400/20 transition-all duration-300 group'>
                <div className='flex justify-end'>
                </div>

                <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                    <img
                        src={`${backend_url}${data.images && data.images[0]}`}
                        alt="prd"
                        className='w-full h-[170px] object-contain'
                    />
                </Link>
                <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                    <h5 className={`${styles.shop_name}`} >{data.shop.name}</h5>
                </Link>
                <Link to={`/product/${data._id}`}>
                    <h4 className='pb-3 font-[500] text-white group-hover:text-green-400 transition-colors duration-300'>
                        {data.name.length > 40 ? data.name.slice(0, 40) + '...' : data.name}
                    </h4>
                    {/* Star Rating */}
                    <div className='flex'>
                        <Ratings rating={data?.ratings} />
                    </div>

                    <div className='py-2 flex items-center justify-between'>
                        <div className='flex'>
                            <h5 className={`${styles.productDiscountPrice}`}>
                                {data.originalPrice === 0 ? data.originalPrice : data.discountPrice}$
                            </h5>

                            <h4 className={`${styles.price}`}>
                                {data.originalPrice ? data.originalPrice + " $" : null}
                            </h4>
                        </div>

                        <span className="font-[400] text-[17px] text-green-400">
                            {data?.sold_out} sold
                        </span>
                    </div>
                </Link>

                {/* side option */}
                <div>
                    {
                        click ? (
                            <AiFillHeart
                                size={22}
                                className="cursor-pointer absolute right-2 top-5 text-red-500 hover:text-red-400 transition-colors duration-300"
                                onClick={() => removeFromWishlistHandler(data)}
                                title='Remove from wishlist'
                            />
                        ) : (
                            <AiOutlineHeart
                                size={22}
                                className="cursor-pointer absolute right-2 top-5 text-gray-400 hover:text-red-500 transition-colors duration-300"
                                onClick={() => addToWishlistHandler(data)}
                                title='Add to wishlist'

                            />
                        )}
                    <AiOutlineEye
                        size={22}
                        className="cursor-pointer absolute right-2 top-14 text-gray-400 hover:text-green-400 transition-colors duration-300"
                        onClick={() => setOpen(!open)}
                        title='Quick view'
                    />

                    <AiOutlineShoppingCart
                        size={25}
                        className="cursor-pointer absolute right-2 top-24 text-gray-400 hover:text-green-400 transition-colors duration-300"
                        onClick={() => addToCartHandler(data._id)}
                        title='Add to cart'
                    />
                    {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
                </div>
            </div>
        </>
    )
}

export default ProductCard