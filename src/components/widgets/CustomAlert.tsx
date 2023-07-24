import React from "react";
import Alert from "react-bootstrap/Alert";

interface CustomAlertProps {
  label: string;
  success: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ label, success }) => {
  if (success) {
    return (
      <Alert key={"success"} variant={"success"}>
        {label}
      </Alert>
    );
  } else {
    return (
      <Alert key={"danger"} variant={"danger"}>
        {label}
      </Alert>
    );
  }
};

export default CustomAlert;
