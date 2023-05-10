import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";

interface ControlButtonProps {
  icon: IconDefinition;
  title: string;
  colorClass?: string;
  to: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({ icon, title, colorClass, to }) => {
  return (
    <Link to={to}>
      <button
        className={`controlButton ${colorClass}`}
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        type="button"
        title={title}
      >
        <FontAwesomeIcon className="iconControl" icon={icon} />
      </button>
    </Link>
  );
};

export default ControlButton;
