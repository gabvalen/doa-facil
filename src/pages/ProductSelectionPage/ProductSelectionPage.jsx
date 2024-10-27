import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import ProductList from './Components/ProductList';
import SearchAndFilter from './Components/SearchAndFilter';
import Pagination from './Components/Pagination';
import { HeaderAndFooter, HeaderAndFooterContainer } from '../../components/Layouts/HeaderAndFooter';
import { useLocation } from 'react-router-dom';
import { getDonations, getDonationsByCategory, searchDonations } from '../../services/donationServices';
import { Category } from '@mui/icons-material';

const ProductSelectionPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const [selectedCategory, setSelectedCategory] = useState(params.get('category'));
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);

    
    useEffect(() => {
      setCurrentProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));
    }, [products, indexOfFirstProduct, indexOfLastProduct]);

    useEffect(() => {
      const fetchDonationsData = async () => {
        try {
          let data;
  
          if (search) {
            data = await searchDonations(search);
          } else if (selectedCategory && selectedCategory !== 'Todos') {
            data = await getDonationsByCategory(selectedCategory);
          } else {
            data = await getDonations();
          }
          setProducts(data?.donations);
          
        } catch (error) {
          console.error('Erro ao buscar doações:', error);
        }
      };
  
      fetchDonationsData();
    }, [search, selectedCategory]);

    
  return (
    <HeaderAndFooter>
      <HeaderAndFooterContainer className="flex p-4 sm:p-8 md:p-12 lg:p-24 flex-col gap-4">
        <div className="relative bg-white min-h-screen">
          <div className="container mx-auto flex flex-col lg:flex-row py-6 md:py-10 space-y-6 lg:space-y-0 lg:space-x-6">
            <Sidebar className="w-full lg:w-1/4 hidden lg:block" 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <main className="w-full lg:w-3/4">
              <SearchAndFilter search={search} setSearch={setSearch}/>

              <ProductList products={currentProducts} />

              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products?.length || 0}
                currentPage={currentPage}
                paginate={paginate}
              />
            </main>
          </div>
        </div>
      </HeaderAndFooterContainer>
    </HeaderAndFooter>
  );
};

export default ProductSelectionPage;
