import React from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface CustomDropdownProps {
  icon: IconDefinition;
  items: Array<{ text: string; icon?: IconDefinition; href?: string; onClick?: () => void }>;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ icon, items }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={FontAwesomeIcon} icon={icon} className="iconControlDrop" />
      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item key={index} href={item.href} onClick={item.onClick}>
            {item.icon && <FontAwesomeIcon icon={item.icon} />} {item.text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
