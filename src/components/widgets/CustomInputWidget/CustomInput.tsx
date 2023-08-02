import React, { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import "./CustomInputs.scss";

interface CustomInputProps {
  label: string;
  placeholder: string;
  typeForm: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  onInvalidText: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  typeForm,
  value,
  onChange,
  required,
  onInvalidText,
}) => {
  if (typeForm == "email") {
    return (
      <Form.Group className="mb-3 sm-1" controlId={label}>
        <Form.Label className="labelForm">{label}</Form.Label>

        <Form.Control
          className="inputForm"
          type="email"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />

        <Form.Control.Feedback type="invalid">
          {onInvalidText}
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  if (typeForm == "number") {
    return (
      <Form.Group className="mb-3 sm-1" controlId={label}>
        <Form.Label className="labelForm">{label}</Form.Label>
        <Form.Control
          className="inputForm"
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        <Form.Control.Feedback type="invalid">
          {onInvalidText}
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  return (
    <Form.Group className="mb-3 sm-1" controlId={label}>
      <Form.Label className="labelForm">{label}</Form.Label>
      <Form.Control
        className="inputForm"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <Form.Control.Feedback type="invalid">
        {onInvalidText}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustomInput;
