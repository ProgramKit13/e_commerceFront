import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface ControlButtonProps {
    to: string;
    label: string;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ to, label }) => {
    return (
        <div className="controlGestaoButtons">
            <Link to={to}>
                <button className="defaultButtonPageAdmin controlGestao controlDark" type="button">
                    {label}
                </button>
            </Link>
        </div>
    );
};
