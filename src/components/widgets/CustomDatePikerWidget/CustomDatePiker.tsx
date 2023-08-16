import React, { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./customDatePicker.scss"

interface CustomDatepickerProps {
  label: string;
  placeholder: string;
  valuedate: Date | null; // Permitiendo 'null'
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;

  onInvalidText: string;
}

const CustomDatepicker: React.FC<CustomDatepickerProps> = ({
  label,
  placeholder,
  valuedate,
  onChange,
  required,
  onInvalidText,
}) => {
  // si la fecha no es valida o es "" utiliza la fecha del dia 
if(valuedate!=null&&isNaN(valuedate.getTime())){
 valuedate = new Date();
}
  const formattedDate = valuedate?.toISOString().slice(0, 10) || '';
  return (
    <Form.Group className="mb-3" controlId={label}>
      <Form.Label className="labelForm">{label}</Form.Label>
      <InputGroup>
        <Form.Control
          className={`inputForm`}
          type="date"
          placeholder={placeholder}
          value={formattedDate}
          onChange={onChange}
          required={required}
        />
    
        <Form.Control.Feedback type="invalid">
          {onInvalidText}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default CustomDatepicker;
