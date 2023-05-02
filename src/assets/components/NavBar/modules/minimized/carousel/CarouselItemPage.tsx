import React from 'react';
import { Col } from 'react-bootstrap';

interface CarouselItemProps {
  title: string;
  value: string;
  colorClass: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ title, value, colorClass }) => {
  return (
    <div className={`${colorClass}`}>
      <span>{title}</span>
      <p>{value}</p>
    </div>
  );
};

export default CarouselItem;
