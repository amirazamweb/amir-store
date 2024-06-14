import React, { useEffect, useState } from 'react'
import { useBg } from '../../context/bg'
import UploadProduct from '../../components/UploadProduct';
import axios from 'axios';
import AdminProductCard from '../../components/AdminProductCard';
import Spinner from '../../components/Spinner';
import UpdateProduct from '../../components/UpdateProduct';
import { Link } from 'react-router-dom';
import productsCategory from '../../helpers/productsCategory';

const AllProducts = () => {
const [bg, setbg] = useBg();
const [allProducts, setAllProducts] = useState([]);
const [showLoader, setShowLoader] = useState(true);
const [updatePopData, setUpdatePopData] = useState(null);
const [pageCount, setPageCount] = useState(1);
const [paginationCategory, setPaginationCategory] = useState('all');
const [paginationPageNumber, setPaginationPageNumber] = useState(1);

// product count
const getProductCount = async(categ)=>{
  const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/product-count/${categ}`);
  const numberOfPages = Math.ceil((res.data.toatalProduct)/12);
  setPageCount(numberOfPages);
}

useEffect(()=>{
  getProductCount(paginationCategory);
}, []);

// selectCategoryHandler
const selectCategoryHandler = async(e)=>{
  getProductCount(e.target.value);
  setPaginationPageNumber(1);
    setPaginationCategory(e.target.value);

    try {
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/pagination`,{
        paginationCategory:e.target.value, paginationPageNumber:1
      });
      setAllProducts(data || []);
      setShowLoader(false);
    } catch (error) {
      console.log(error);
    }
    
}

// get all product by page numer
const getAllProductsByPageNumber = async(num)=>{
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/pagination`,{
      paginationCategory, paginationPageNumber:num
    });
    setAllProducts(data || []);
    setShowLoader(false);
  } catch (error) {
    console.log(error);
  }
}


// prev page handler
const previousPageHandler = ()=>{
   if(paginationPageNumber==1){
    return
   }

   getAllProductsByPageNumber(paginationPageNumber-1);
   setPaginationPageNumber(paginationPageNumber-1);

}

// next page handler
const nextPageHandler = ()=>{
  if(paginationPageNumber==pageCount){
   return
  }

  getAllProductsByPageNumber(paginationPageNumber+1);
  setPaginationPageNumber(paginationPageNumber+1);

}

// get default products
const getAllProducts = async()=>{
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/pagination`,{
      paginationCategory, paginationPageNumber:1
    });
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
        <div className='px-8 pt-6 max-h-[calc(100vh-104px)] h-full overflow-auto relative'>
      <div className='flex justify-between items-center'>
      <h1 className='text-xl font-semibold text-[#2c2c54]'>All Products</h1>

      <div className='flex gap-4 items-center'>
      <select 
      className='outline-none text-[#FE4938] border border-[#FE4938] px-3 py-1.5 text-sm rounded-3xl'
      onChange={selectCategoryHandler}>
      <option disabled selected>Select category</option>
      <option value='all'>All</option>
      {productsCategory?.map((p)=>{
        return <option value={p.value}>{p.label}</option>
      })}
      </select>

      <button className='text-[#FE4938] border border-[#FE4938] px-3 py-1.5 text-sm rounded-3xl hover:bg-[#FE4938] hover:text-white transition-all' onClick={handleUploadProduct}>Upload Product</button>
      </div>

      </div>

       {
        allProducts.length?
        (<div className='mt-[20px] flex justify-center flex-wrap gap-5'>
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
       {bg?.showUploadProduct && <UploadProduct getAllProducts={getAllProducts} getProductCount={getProductCount}/>}
       {bg?.showUpdateProduct && <UpdateProduct {...updatePopData} getAllProducts={getAllProducts}/>}
    
      {/* pagination start */}

      <div className='all-product-pagination'>
        <div className='pagination'>
        <button onClick={previousPageHandler}>Prev</button>
        <div>{paginationPageNumber} of {pageCount}</div>
        <button onClick={nextPageHandler}>Next</button>
        </div>
      </div>

    </div>
    )
  )
}

export default AllProducts