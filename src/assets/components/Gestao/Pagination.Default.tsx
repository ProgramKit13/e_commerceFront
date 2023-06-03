// PaginationDefault.tsx
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';

interface PaginationProps {
  items: number[];
  active: number;
  onClick: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
}

const AdvancedPagination: React.FC<PaginationProps> = ({ items, active, onClick, onNext, onPrev, onFirst, onLast}) => (
  <Pagination>
    <Pagination.First onClick={onFirst}/>
    <Pagination.Prev onClick={onPrev} />
    {items.map((item, index) => (
      <Pagination.Item className={`pagination-link ${item === active ? 'active' : ''}`} key={index} onClick={() => onClick(item)}>
        {item}
      </Pagination.Item>
    ))}
   <Pagination.Next onClick={onNext}/>
   <Pagination.Last onClick={onLast} />
  </Pagination>
);

export default AdvancedPagination;
