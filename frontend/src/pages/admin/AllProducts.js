import React, { useEffect, useState } from 'react'
import { useBg } from '../../context/bg'
import UploadProduct from '../../components/UploadProduct';
import axios from 'axios';
import AdminProductCard from '../../components/AdminProductCard';
import Spinner from '../../components/Spinner';
import UpdateProduct from '../../components/UpdateProduct';

const AllProducts = () => {
const [bg, setbg] = useBg();
const [allProducts, setAllProducts] = useState([]);
const [showLoader, setShowLoader] = useState(true);
const [updatePopData, setUpdatePopData] = useState(null);

// get all products
const getAllProducts = async()=>{
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/all-products`);
    setAllProducts(data || []);
    setShowLoader(false);
  } catch (error) {
    console.log(error);
  }
}

// useEffect
useEffect(()=>{
    getAllProducts();
}, [])

// handleUploadProduct
const handleUploadProduct = ()=>{
  setbg({...bg, darkBg:true, showUploadProduct:true});
}

  return (
    showLoader?
    (<Spinner/>):
    (
        <div className='px-8 py-6'>
      <div className='flex justify-between items-center'>
      <h1 className='text-xl font-semibold text-[#2c2c54]'>All Products</h1>
      <button className='text-[#FE4938] border border-[#FE4938] px-3 py-1.5 text-sm rounded-3xl hover:bg-[#FE4938] hover:text-white transition-all' onClick={handleUploadProduct}>Upload Product</button>
      </div>

       {
        allProducts.length?
        (<div className='mt-[20px] flex flex-wrap gap-6'>
          {allProducts.map((p, i)=>{
            return <AdminProductCard
            key={i}
            data={p}
            callBack={setUpdatePopData}
            getAllProducts={getAllProducts}
            />
          })}
        </div>):
        (
          <div className='mt-4 text-slate-700'>No product here. Kindly upload the product!</div>
        )
       }

      {/* upload product */}
       {bg?.showUploadProduct && <UploadProduct getAllProducts={getAllProducts}/>}
       {bg?.showUpdateProduct && <UpdateProduct {...updatePopData} getAllProducts={getAllProducts}/>}
    </div>
    )
  )
}

export default AllProducts