import React, { useEffect, useState } from 'react';
import axios from 'axios';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';

const RecommendedProduct = ({id, heading, category}) => {
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadingProduct = new Array(5).fill(null);

    const getAllProductsHandler = async()=>{
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/recommend-product/${id?id:'dummy'}`, {category});  
            if(data?.success){
                setProductsList(data?.products);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // use Effect
    useEffect(()=>{
      getAllProductsHandler();
    }, [id])


  return (
    <div className='px-4 md:px-6'>
        <h1 className='text-lg md:text-xl font-semibold mb-3 md:mb-5'>{heading}</h1>

        <div className='flex flex-wrap gap-2 md:gap-6'>
            {
                loading?(
                    loadingProduct?.map((product)=>{
                        return <div  key={product?.productName} className='w-full sm:w-56 border'>
                              <div className='h-36 w-full p-4 bg-slate-100'>
                              </div>
                              <div className='bg-white p-2 flex flex-col gap-2'>
                                 <h1 className='bg-slate-100 w-full h-5 animate-pulse'></h1>
                                 <p className='bg-slate-100 w-full h-4 animate-pulse'></p>
                                  <div className='text-sm flex items-center gap-6'>
                                    <p className='bg-slate-100 w-[46%] h-5 animate-pulse'></p>
        
                                    <p className='bg-slate-100 w-[46%] h-5 animate-pulse'></p>
                                  </div>
                                  <button className='bg-slate-100 w-full h-5 rounded-xl cursor-auto animate-pulse'></button>
                              </div>
                        </div>
                    })
                ):
                (
                    productsList?.map((product)=>{
                        return <Link to={`/product-detail/${product?._id}`} key={product?.productName} className='w-full sm:w-56 border'>
                              <div className='h-40 w-full p-4 bg-slate-100'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full w-full object-scale-down mix-blend-multiply'/>
                              </div>
                              <div className='bg-white p-2'>
                                 <h1 className='font-semibold text-ellipsis line-clamp-1'>{product?.productName}</h1>
                                 <p className='text-slate-400'>{product?.category}</p>
                                  <div className='text-sm flex items-center gap-6'>
                                    <p className='text-red-600'>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(product?.sellingPrice)}</p>
        
                                    <p className='text-slate-500 line-through'>&#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(product?.price)}</p>
                                  </div>
                                  <button className='w-full bg-red-600 text-white rounded-xl text-sm my-2 py-[2px]' onClick={(e)=>addToCart(e, product?._id)}>Add to Cart</button>
                              </div>
                        </Link>
                    })
                )
            }
        </div>
        
    </div>
  )
}

export default RecommendedProduct