import React from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselItem from './CarouselItemPage';

const CarouselPage: React.FC = () => {
  return (
    <div className="col-sm-3 colsItemsDisplay">
      <Carousel
        id="carousel-1"
        className="carousel slide carousel-fade itemcarousel"
        data-bs-ride="carousel"
        data-bs-pause="false"
        controls={false}
        indicators={false}
      >
        <Carousel.Item>
          <CarouselItem title="Fluxo Mensal" value="R$1500,00" colorClass="greenCarrousel" />
        </Carousel.Item>
        <Carousel.Item>
          <CarouselItem title="Fluxo Semanal" value="R$1500,00" colorClass="greenCarrousel" />
        </Carousel.Item>
        <Carousel.Item>
          <CarouselItem title="Fluxo Diário" value="R$1500,00" colorClass="greenCarrousel" />
        </Carousel.Item>
        <Carousel.Item>
          <CarouselItem title="Gastos" value="R$1500,00" colorClass="yellowCarousel" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselPage;
