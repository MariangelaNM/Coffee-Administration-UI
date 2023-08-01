import React, { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import "./CustomInputs.scss";

interface CustomSearchProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const CustomSearch: React.FC<CustomSearchProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <Form.Group className="mb-3 sm-1" controlId={label}>
      <Form.Label className="labelForm">{label}</Form.Label>
      <Form.Control
        className="inputForm"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};
export default CustomSearch;
