import React from 'react';

const InterestProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <img src={product.imgSrc} alt={product.name} className="w-full h-32 object-contain mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default InterestProducts;
