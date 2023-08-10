import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import "./CustomDropDown.scss";

interface DropdownProps<T extends number | string> {
  labelname: string;
  options: { value: T; label: string }[];
  onSelect: (selectedValue: T) => void;
  onInvalidText: string;

}

const CustomDropDown = <T extends number | string>({
  labelname,
  options,
  onSelect,
  onInvalidText,

}: DropdownProps<T>) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as T;
    onSelect(selectedValue);
  };

  return (
    <Form.Group className="mb-3 sm-1" controlId={labelname}>
      <Form.Label className="labelForm text-selection-disable">
        {labelname}
      </Form.Label>

      <Form.Select
        aria-label="Default select example"
        className="customdropdown"
        onChange={handleSelectChange}
      
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>

      <Form.Control.Feedback type="invalid">
        {onInvalidText}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustomDropDown;
