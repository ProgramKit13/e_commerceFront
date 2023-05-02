import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ControlButtonProps {
  icon: IconDefinition;
  title: string;
  colorClass?: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({ icon, title, colorClass }) => {
  return (
    <button
      className={`controlButton ${colorClass}`}
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      type="button"
      title={title}
    >
      <FontAwesomeIcon className="iconControl" icon={icon} />
    </button>
  );
};

export default ControlButton;
