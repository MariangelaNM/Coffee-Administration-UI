import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form } from "react-bootstrap";

import createApiClient from "../../api/api-client-factory";
import { Zona } from "../../models/Zona";
import { useCreateUser } from "../../hooks/useCreateUser";

import CustomTitles from "../widgets/CustomTitles";
import CustomInput from "../widgets/CustomInputWidget/CustomInput";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustomButtonSecondary from "../widgets/CustomButtonSecondaryWidget/CustomButtonSecondary";
import CustomAlert from "../widgets/CustomAlert";

import { useHistory, useLocation } from 'react-router-dom';

// interface ZonaEditProps {
//   zona?: Zona; // Cambia el tipo según el tipo de la variable que estés enviando
// }

//const ZonasControl: React.FC<ZonaEditProps> = (zonaEdit) => {
  const ZonasControl=() => {
  const emptyZonaInput: Partial<Zona> = {
    id:0,
    nombre: "",
    descripcion: "",
  };

  const [zonaInput, setZonaInput] = useState<Partial<Zona>>(emptyZonaInput);

  const history = useHistory();
  const location = useLocation();

  const apiClient = useMemo(() => createApiClient(), []);
  const { create, status, error } = useCreateUser(apiClient.postUser);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const zonaString = queryParams.get('zona');
    if (zonaString) {
      setZonaInput(JSON.parse(decodeURIComponent(zonaString))) ;
      // Aquí puedes utilizar el objeto usuario como desees
      console.log(zonaInput);
    } else {
      // Redireccionar a otra página si el parámetro no está presente
      history.push('/error');
    }

    if (status === "success") {
      console.log("Creacion exitosa");
      // history.push('/login')
    } else {
      //console.log(error);
    }
    // return () => {};
  }, [history, location.search, status]);

  function onChange(e: ChangeEvent<HTMLInputElement>, attribute: keyof Zona) {
    setZonaInput({ ...zonaInput, [attribute]: e.target.value });
  }

  function onReset() {
    setZonaInput(emptyZonaInput);
  }

  const readyToSubmit = zonaInput.nombre !== "" && zonaInput.descripcion !== "";

  function displayErrorMessage() {
    if (error) {
      return <CustomAlert success={false} label={error.message} />;
    }
    return null;
  }
  function displaySuccessMessage() {
    if (status === "success") {
      return <CustomAlert success={true} label="Cuenta creada exitosamente" />;
    }
    return null;
  }
  async function postZona() {
    console.log("postZona");
  }
  async function updateZona() {
    console.log("updateZona");
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles
        txt={zonaInput.id!=0 ? "Editar zona" : "Crea una nueva zona"}
      />
      {displayErrorMessage()}
      {displaySuccessMessage()}
      <Form noValidate validated={readyToSubmit}>
        <CustomInput
          label="Nombre"
          placeholder="Nombre"
          typeForm="text"
          value={zonaInput.nombre as string}
          onChange={(e) => onChange(e, "nombre")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        <CustomInput
          label="Descripción"
          placeholder="Descripción"
          typeForm="text"
          value={zonaInput.descripcion as string}
          onChange={(e) => onChange(e, "descripcion")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        {zonaInput.id!= 0 ? (
          <div className="d-grid gap-2">
            <CustomButtonPrimary
              label="Actualizar"
              onClick={async () => updateZona()}
              disabled={status === "loading" || !readyToSubmit}
            />
            <CustomButtonSecondary label="Cancelar" onClick={() => onReset()} />
          </div>
        ) : (
          <div className="d-grid gap-2">
            <CustomButtonPrimary
              label="Registrar"
              onClick={async () => postZona()}
              disabled={status === "loading" || !readyToSubmit}
            />
            <CustomButtonSecondary label="Cancelar" onClick={() => onReset()} />
          </div>
        )}
      </Form>
    </Container>
  );
};

export default ZonasControl;
