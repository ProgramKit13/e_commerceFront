import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { ThemeContext } from '../NavBar/controls/controlTheme/SwitchContext';
import { useContext } from 'react';


interface ControlButtonProps {
    to: string;
    label: string;
}


export const ControlButton: React.FC<ControlButtonProps> = ({ to, label }) => {
    const { isTheme } = useContext(ThemeContext);

    return (
        <div className="controlGestaoButtons">
            <Link to={to}>
                <button className={`defaultButtonPageAdmin controlGestao ${isTheme ? 'controlDark' : 'controlWhite'}`} type="button">
                    {label}
                </button>
            </Link>
        </div>
    );
};
