import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form } from "react-bootstrap";

import createApiClient from "../../api/api-client-factory";
import { Zona } from "../../models/Zona";
import { Periodo } from "../../models/Periodo";
import { useCreate } from "../../hooks/useCreateUser";

import CustomTitles from "../widgets/CustomTitles";
import CustomInput from "../widgets/CustomInputWidget/CustomInput";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustomButtonSecondary from "../widgets/CustomButtonSecondaryWidget/CustomButtonSecondary";
import CustomAlert from "../widgets/CustomAlert";
import CustomDatePiker from "../widgets/CustomDatePikerWidget/CustomDatePiker";
import CustomDropDown from "../widgets/CustomDropDown/CustomDropDown";

import { useHistory, useLocation } from "react-router-dom";
import { TipoRecoleccion } from "../../models/TipoRecoleccion";

const MisPeriodosControl = () => {
 /* const emptyPeriodoInput: Partial<Periodo> = {
    id: 0,
    TipoRecoleccionID: 0,
    Desde: new Date(),
    Hasta: new Date(),
    Value: 0,
  };
  const options = [
    { value: TipoRecoleccion.SinSeleccion, label: "Sin Selección" },
    { value: TipoRecoleccion.Granea, label: "Granea" },
    { value: TipoRecoleccion.Buena, label: "Buena" },
    { value: TipoRecoleccion.Repela, label: "Repela" },
  ];

  const [periodoInput, setPeriodoInput] =
    useState<Partial<Periodo>>(emptyPeriodoInput);

  const [wasSelected, setWasSelected] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const apiClient = useMemo(() => createApiClient(), []);
  const { create, status, error } = useCreate(apiClient.postUser);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const periodoString = queryParams.get("periodo");
    if (periodoString) {
      setPeriodoInput(JSON.parse(decodeURIComponent(periodoString)));
      // Aquí puedes utilizar el objeto usuario como desees
      console.log(periodoInput);
    } else {
      // Redireccionar a otra página si el parámetro no está presente
      history.push("/error");
    }

    if (status === "success") {
      console.log("Creacion exitosa");
      // history.push('/login')
    } else {
      //console.log(error);
    }
    // return () => {};
  }, [history, location.search, status]);

  function onChange(
    e: ChangeEvent<HTMLInputElement>,
    attribute: keyof Periodo
  ) {
    if (attribute == "Desde" || attribute == "Hasta") {
      setPeriodoInput({
        ...periodoInput,
        [attribute]: new Date(e.target.value),
      });
      return;
    }
    setPeriodoInput({ ...periodoInput, [attribute]: e.target.value });
  }

  function onReset() {
    setPeriodoInput(emptyPeriodoInput);
  }

  const readyToSubmit =
    periodoInput.TipoRecoleccionID !== 0 &&
    periodoInput.Value > 0 &&
    new Date(Date.parse(periodoInput.Desde)).getTime() <=
    new Date(Date.parse(periodoInput.Hasta)).getTime();

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
  const handleSelect = (value: TipoRecoleccion) => {
    console.log("Opción seleccionada:", value);
    setWasSelected(true);
    setPeriodoInput({ ...periodoInput, ["TipoRecoleccionID"]: value });
  };
  async function postPeriodo() {
    const errorMessage = !readyToSubmit
      ? "Uno o más datos son incorrectos"
      : undefined;

    console.log("postPeriodo" + errorMessage);
  }
  async function updatePeriodo() {
    console.log("updatePeriodo");
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles
        txt={periodoInput.id != 0 ? "Editar periodo" : "Crea un nuevo periodo"}
      />
      {displayErrorMessage()}
      {displaySuccessMessage()}
      <Form noValidate validated={readyToSubmit}>
        <CustomDropDown
          labelname={"Seleccionar opción"}
          options={options}
          onSelect={handleSelect}
          onInvalidText={"El campo no puede estar vacio"}
         
        />
        <CustomInput
          label="Pago por unidad"
          placeholder="Pago por unidad"
          typeForm="number"
          value={periodoInput.Value as number}
          onChange={(e) => onChange(e, "Value")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />

        <CustomDatePiker
          label="Desde"
          placeholder="Desde"
          valuedate={new Date(Date.parse(periodoInput.Desde))}
          onChange={(e) => onChange(e, "Desde")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        <CustomDatePiker
          label="Hasta"
          placeholder="Hasta"
          valuedate={new Date(Date.parse(periodoInput.Hasta))}
          onChange={(e) => onChange(e, "Hasta")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        {periodoInput.id != 0 ? (
          <div className="d-grid gap-2">
            <CustomButtonPrimary
              label="Actualizar"
              onClick={async () => updatePeriodo()}
              disabled={status === "loading" || !readyToSubmit}
            />
            <CustomButtonSecondary label="Cancelar" onClick={() => onReset()} />
          </div>
        ) : (
          <div className="d-grid gap-2">
            <CustomButtonPrimary
              label="Registrar"
              onClick={async () => postPeriodo()}
              disabled={status === "loading" || !readyToSubmit}
            />
            <CustomButtonSecondary label="Cancelar" onClick={() => onReset()} />
          </div>
        )}
      </Form>
    </Container>
  );*/
};

export default MisPeriodosControl;
