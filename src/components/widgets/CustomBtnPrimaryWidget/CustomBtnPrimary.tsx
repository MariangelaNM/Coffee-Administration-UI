import React from "react";
import Button from "react-bootstrap/Button";
import "./CustomBtnPrimary.scss";

interface CustomButtonPrimaryProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
}

const CustomButtonPrimary: React.FC<CustomButtonPrimaryProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <Button
      variant="primary"
      className="custombtn-primary"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default CustomButtonPrimary;
