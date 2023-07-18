import React, { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./CustomInputs.scss"

interface CustomPasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  confirmPasswordValid: boolean;
  togglePasswordVisibility: () => void;
  showPassword: boolean;
  onInvalidText: string;
}

const CustomPasswordInput: React.FC<CustomPasswordInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required,
  confirmPasswordValid,
  togglePasswordVisibility,
  showPassword,
  onInvalidText,
}) => {
  return (
    <Form.Group className="mb-3" controlId={label}>
      <Form.Label className="labelForm">{label}</Form.Label>
      <InputGroup>
        <Form.Control
         className={`inputForm`}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          isInvalid={!confirmPasswordValid && value !== ""}
        />
        <InputGroup.Text
          className="inputGroupico"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </InputGroup.Text>
        <Form.Control.Feedback type="invalid">
          {onInvalidText}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default CustomPasswordInput;
