import React from 'react';
import { useParams } from 'react-router-dom';


const ProductCategory = () => {
    const {categoryName} = useParams();
  return (
    <div>{categoryName}</div>
  )
}

export default ProductCategory