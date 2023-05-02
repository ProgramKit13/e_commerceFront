import React, { useState, useEffect } from 'react';
import { faBars, faChartLine, faThLarge, faDesktop, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const CircularMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleCircularMenu = () => {
      setIsOpen(!isOpen);
    };
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const menu = document.getElementById('circularMenu1');
        const button = menu?.querySelector('.floating-btn');
  
        if (menu && !menu.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
  
    return (
      <div id="circularMenu1" className={`circular-menu circular-menu-left${isOpen ? ' active' : ''}`}>
        <a className="floating-btn" onClick={toggleCircularMenu}>
          <FontAwesomeIcon icon={faBars} />
        </a>
  
        <menu className="items-wrapper">
        <a href="#" className="menu-item">
          <FontAwesomeIcon icon={faChartLine} />
        </a>
        <a href="#" className="menu-item">
          <FontAwesomeIcon icon={faThLarge} />
        </a>
        <a href="#" className="menu-item">
          <FontAwesomeIcon icon={faDesktop} />
        </a>
        <a href="#" className="menu-item">
          <FontAwesomeIcon icon={faUserCircle} />
        </a>
      </menu>
      </div>
    );
  };
  
  export default CircularMenu;
  