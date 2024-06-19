import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

const ProductDetail = () => {
    const {id} = useParams();
    const [data, setData] = useState({
    productName:'',
    brandName:'',
    category:'',
    productImage:[],
    price:'',
    sellingPrice:'',
    description:''
    })


    const ProductImageLoadingList = new Array(4).fill(null);
    const [loading, setLoading] = useState(true); 
    const [zoomImgURL, setZoomImgURL] = useState('');


    // get product details
    const getProductDetail = async()=>{
        setLoading(true);
        try {
         const res = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/single-product/${id}`);   
         if(res?.data?.success){
            setData(res?.data?.productDetails);
            setLoading(false);
         }
        } catch (error) {
            console.log(error);
        }
    }

    // use effect
    useEffect(()=>{
    getProductDetail(); 
    }, [])

// showZoomHandler
const showZoomHandler = (url)=>{
   setZoomImgURL(url);
}


  return (
    <div className='container mx-auto '>
        <div className='py-4 md:py-8 px-2 md:px-28 flex flex-col md:flex-row gap-2 md:gap-8'>
            {
                loading?
                (
                    <div className='flex flex-col md:flex-row gap-2 md:gap-4 items-center md:items-start'>
                         <div className='max-h-72 h-16 md:h-72 w-20 flex md:flex-col gap-1 p-2 border'>
                            <div className='w-16 h-16 bg-slate-200 animate-pulse'></div>
                            <div className='w-16 h-16 bg-slate-200 animate-pulse'></div>
                            <div className='w-16 h-16 bg-slate-200 animate-pulse'></div>
                            <div className='w-16 h-16 bg-slate-200 animate-pulse'></div>
                         </div>
                         <div className='w-full h-[40vh] md:h-80 md:w-80 bg-slate-200 animate-pulse'></div>
                  </div>
                ):
                (
                    <div className='flex flex-col md:flex-row gap-2 md:gap-4 items-center md:items-start'>
                       <div className='max-h-72 h-fit w-fit flex md:flex-col gap-1 p-2 border relative'>
                         {
                           data?.productImage.map((url)=>{
                            return <div className='w-16 h-16 bg-slate-200' key={url} onMouseEnter={()=>showZoomHandler(url)}>
                                    <img src={url} alt={data?.category} className='h-full w-full object-scale-down mix-blend-multiply'/>
                                   </div>
                           })
                         }

                       </div>
                    <div className='w-full h-[40vh] md:h-80 md:w-80 bg-slate-200'>
                      <img src={zoomImgURL || data?.productImage[0]} alt='zoomImgURL' className='w-full h-full object-scale-down mix-blend-multiply'/>
                    </div>
                     </div>
                )
            }
        
        {
          loading?(
          <div className='ps-3 md:ps-0 flex flex-col gap-2'>
          <p className='bg-slate-200 rounded-2xl w-20 h-6 animate-pulse'></p>
          <h1 className='w-full h-8 bg-slate-200 animate-pulse'></h1>
          <p className='bg-slate-200 w-24 h-6 animate-pulse'></p>
          <div className='bg-slate-200 w-24 h-6 animate-pulse'></div>
          <div className='w-36 h-8 bg-slate-200 animate-pulse'></div>
          <div className='flex gap-4 items-center py-1 animate-pulse'>
            <button className='w-[110px] md:min-w-[120px] h-8 bg-slate-200 rounded-md cursor-auto animate-pulse'></button>
            <button className='w-[110px] md:min-w-[120px] h-8 bg-slate-200 rounded-md cursor-auto animate-pulse'></button>
          </div>
          <p className='bg-slate-200 h-6 w-36 animate-pulse'></p>
          <p className='bg-slate-200 h-12 w-36 animate-pulse'></p>
        </div>
          ):
          (
            <div className='ps-3 md:ps-0 flex flex-col gap-1'>
          <p className='text-red-700 bg-red-100 rounded-2xl px-4 w-fit'>{data?.brandName}</p>
          <h1 className='text-lg md:text-2xl font-semibold'>{data?.productName}</h1>
          <p className='text-slate-400 capitalize text-md'>{data?.category}</p>
          <div className='flex gap-1.5 text-red-600'>
               <FaStar />
               <FaStar />
               <FaStar />
               <FaStar />
               <FaStarHalf />
          </div>
          <div className='text-base md:text-xl flex gap-4 py-1 font-medium'>
            <span className='text-red-600'>
              &#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(data?.sellingPrice)}
              </span>
            <span className='text-slate-400 line-through'>
              &#8377;{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(data?.price)}
              </span>
          </div>
          <div className='flex gap-4 items-center py-1'>
            <button className='w-[110px] md:min-w-[120px] border border-red-600 text-red-600 py-[2px] px-4 rounded text-sm md:text-base hover:bg-red-600 hover:text-white'>Buy</button>
            <button className='w-[110px] md:min-w-[120px] border border-red-600 bg-red-600 text-white py-[2px] px-4 rounded text-sm md:text-base hover:bg-white hover:text-red-600'>Add To Cart</button>
          </div>
          <p className='text-base font-semibold'>Description:</p>
          <p className='text-slate-800'>{data?.description}</p>
        </div>
          )
        }

        </div>
    </div>
  )
}

export default ProductDetail