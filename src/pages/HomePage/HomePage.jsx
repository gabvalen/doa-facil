import { Link } from 'react-router-dom';
import { HeaderAndFooter, HeaderAndFooterContainer } from '../../components/Layouts/HeaderAndFooter.jsx';
import { Separator } from '../../components/Separator.jsx';
import { SectionHeader } from './components/SectionHeader.jsx';
import { ProductList } from './components/ProductList';
import { CategoryList } from './components/CategoryList'; 
import { HomeCarousel } from "./components/HomeCarousel";
export function HomePage() {
  return (
    <>
      <HeaderAndFooter>
        <HeaderAndFooterContainer className="flex flex-col lg:flex-row gap-8 lg:gap-4">

          {/* Conteúdo principal sem o menu lateral */}
          <div className="flex flex-col w-full h-fit-content bg-white shadow-md contrast:bg-black">

            {/* Carrossel no topo */}
            <div className="w-full">
              <HomeCarousel />
            </div>

            {/* Seção Recentes e Mais Buscados */}
            <div className="flex flex-col p-6 md:p-8 lg:p-12 gap-8">
              <SectionHeader label="Recentes" title="Mais recentes" key="recentes" />
              
              {/* Renderizando a lista de produtos */}
              <ProductList />
              
              {/* Botão Ver Todos Produtos */}
              <div className="w-full flex items-center justify-center mt-8">
                <Link
                  to="/product-selection"
                  className="cursor-pointer p-4 rounded-md bg-vermelho-escuro hover:bg-vermelho-médio transition-colors text-white font-poppins contrast:bg-custom-yellow contrast:text-custom-black contrast:hover:bg-white"
                >
                  Ver Todos Produtos
                </Link>
              </div>

              <Separator className="my-8 h-0.5 bg-gray-200" />

              {/* Seção Categorias */}
              <SectionHeader label="Categorias" title="Busque por Categoria" theresViewAll key="categorias" />
              
              {/* Renderizando a lista de categorias */}
              <CategoryList />
            </div>
          </div>
        </HeaderAndFooterContainer>
      </HeaderAndFooter>
    </>
  );
}
