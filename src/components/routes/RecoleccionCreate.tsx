import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomInput from "../widgets/CustomInputWidget/CustomInput";
import CustomDropDown from "../widgets/CustomDropDown/CustomDropDown";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustomButtonSecondary from "../widgets/CustomButtonSecondaryWidget/CustomButtonSecondary";

const RecoleccionCreate = () => {
  const [recoleccion, setRecoleccion] = useState({
    recolector: 0,
    costo: 0,
    cajuelas: 0,
    cuartillos: 0,
  });
  const [wasSelected, setWasSelected] = useState(false);

  const options = [
    { value: 0, label: "Sin Selección" },
    { value: 1, label: "Juan" },
    { value: 2, label: "Pedro" },
    { value: 3, label: "Oscar" },
  ];

  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setRecoleccion({
        recolector: 0,
        costo: 0,
        cajuelas: 0,
        cuartillos: 0,
      });

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  function displayErrorMessage() {
    if (errorMsg) {
      return <div>Error: {errorMsg}</div>;
    }
    return null;
  }

  const handleInputChange = (field: any) => {
    return (e: { target: { value: any } }) => {
      setRecoleccion((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      setErrorMsg("");
    };
  };
  const handleSelect = (value: string) => {
    console.log("Opción seleccionada:", value);
    setWasSelected(true);
  };

  const handleKeyPress = (event: {
    target: any;
    key: any;
    preventDefault: () => void;
  }) => {
    const allowedKeys = new Set(["0", "1", "2", "3", "4"]);
    const key = event.key;
    const currentValue = event.target.value;
    if (currentValue.length === 1 || !allowedKeys.has(key)) {
      event.preventDefault();
    }
  };

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{"Nuevo Registro"}</Title>
      {displayErrorMessage()}
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          ¡La Recolección fue guardada con exito!
        </div>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <CustomDropDown
          labelname={"Recolector"}
          options={options}
          onSelect={handleSelect}
          onInvalidText={"El campo no puede estar vacio"}
        />
        <CustomInput
          label="Costo Unitario (₡)"
          placeholder="Valor por cada cajuela (₡)"
          typeForm="number"
          value={recoleccion.costo}
          onChange={handleInputChange("costo")}
          required
          onInvalidText={"El campo no puede ser 0"}
        />
        <CustomInput
          label="Cajuelas"
          placeholder="Cantidad de Cajuelas"
          typeForm="number"
          value={recoleccion.cajuelas}
          onChange={handleInputChange("cajuelas")}
          required
          onInvalidText={"El campo no puede estar vacío"}
        />
        <CustomInput
          label="Cuartillos"
          placeholder="Cantidad de Cuartillos"
          typeForm="number"
          value={recoleccion.cuartillos}
          onChange={handleInputChange("cuartillos")}
          min={0}
          max={4}
          step={1}
          required
          onInvalidText={"El campo no puede ser menor a 0 o mayor a 4"}
        />
        <div className="d-grid gap-2">
          <CustomButtonPrimary
            label="Registrar"
            onClick={() => console.log("Actualiza")}
            disabled={false}
            // disabled={status === "loading" || !readyToSubmit}
          />
          <CustomButtonSecondary
            label="Cancelar"
            onClick={() => console.log("Cancelar")}
          />
        </div>
      </Form>
    </Container>
  );
};

const Title = styled(H1)`
  color: ${themes.dark.text1};
  text-align: start;
`;

export default RecoleccionCreate;
