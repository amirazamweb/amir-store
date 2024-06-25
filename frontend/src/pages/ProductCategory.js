import React from 'react';
import { useParams } from 'react-router-dom';
import RecommendedProduct from '../components/RecommendedProduct';


const ProductCategory = () => {
    const {categoryName} = useParams();
  return (
    <div className='container mx-auto'>
      <div className='my-4 md:my-6'>
      <RecommendedProduct heading={`Category : ${categoryName.toUpperCase()}`} category={categoryName}/>
      </div>
    </div>
  )
}

export default ProductCategory;