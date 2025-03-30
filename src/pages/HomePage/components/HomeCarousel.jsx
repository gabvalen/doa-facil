import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

// Estilos do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Exemplo de slides
const slides = [
  {
    id: 1,
    src: "/conectando.png",
    alt: "Banner Conectando Solidariedade",
  },
  {
    id: 2,
    src: "/campanha1.png",
    alt: "Cartaz de Campanha Fake de doação",
  },
  {
    id: 3,
    src: "/campanha2.png",
    alt: "Outro cartaz de doação",
  },
];

export function HomeCarousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      // A cada 5000 ms (5 segundos) troca de slide, e "speed" define a duração da animação (1.2s).
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      speed={1200}
      slidesPerView={1}
      spaceBetween={0}
      className="w-full h-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.id}>
          {/* Container relativo para posicionar botão por cima da imagem */}
          <div className="relative">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-auto object-cover"
            />

            {/* Exibe o botão somente se for o segundo slide (index===1) */}
            {index === 1 && (
              <Link
                to="/create"
                className="absolute bottom-16 right-28 bg-vermelho-médio text-white px-4 py-2 rounded shadow-lg hover:bg-azul-claro transition"
              >
                Cadastrar Doação
              </Link>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
