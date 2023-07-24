import React from "react";
import Button from "react-bootstrap/Button";
import "./CustomButtonSecondary.scss";
interface CustomButtonSecondaryProps {
  label: string;
  onClick: () => void;
}

const CustomButtonSecondary: React.FC<CustomButtonSecondaryProps> = ({
  label,
  onClick,
}) => {
  return (
    <Button variant="primary" className="custombtn-secondary" onClick={onClick}>
      {label}
    </Button>
  );
};

export default CustomButtonSecondary;
