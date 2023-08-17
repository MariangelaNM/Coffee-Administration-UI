import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form } from "react-bootstrap";
import createApiClient from "../../api/api-client-factory";
import { Zona } from "../../models/Zona";
import CustomTitles from "../widgets/CustomTitles";
import CustomInput from "../widgets/CustomInputWidget/CustomInput";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustomButtonSecondary from "../widgets/CustomButtonSecondaryWidget/CustomButtonSecondary";
import { useHistory, useLocation } from 'react-router-dom';
import Alert from "@mui/material/Alert";

const ZonasControl = () => {
  const emptyZonaInput: Partial<Zona> = {
    Id: undefined,
    Nombre: "",
    Descripcion: "",
    FincaID: undefined
  };

  const [errorMsg, setErrorMsg] = useState("Error al registrar la data");
  const [zonaInput, setZonaInput] = useState<Partial<Zona>>(emptyZonaInput);
  const [zonaId, setZonaId] = useState("");
  const [zonaData, setzonaData] = useState<Zona[]>([]);
  const [showSuccessMessageError, setShowSuccessMessageError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const history = useHistory();
  const location = useLocation();
  let fincaID: Number=0;
  let zonaID: Number=0;

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    CallIds();
  }, [history, location.search, status, emptyZonaInput]);

  function CallIds() {
    const queryParams = new URLSearchParams(location.search);
    const fincaString = queryParams.get('farm') ?? "";
    const zonaString = queryParams.get('zona') ?? "";
    setZonaId(zonaString);
    if (fincaString) {
      const id = (fincaString);
      emptyZonaInput.FincaID = (parseInt(id));
      fincaID = (emptyZonaInput.FincaID);
    } else if (zonaString) {
      emptyZonaInput.Id = (parseInt(zonaString));
      zonaID = (emptyZonaInput.Id);

    } else {
      history.push("/error");
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>, attribute: keyof Zona) {
    setZonaInput({ ...zonaInput, [attribute]: e.target.value });
  }

  function onReset() {
    setZonaInput(emptyZonaInput);
    history.push("/MisPeriodos?zona=" + zonaID);
  }

  async function postZona() {
    try {
      const response = await createApiClient().makeApiRequest("POST", "/Zonas", zonaInput);
      if ("success" in response) {
        setShowSuccessMessageError(true);
      }
      if (response.toString() == "201") {
        setShowSuccessMessageError(false);
        setShowSuccessMessage(true);
        history.push("/Zonas?farm=" + fincaID);
      } else {
        setTimeout(() => {
          setShowSuccessMessageError(false);
        }, 3000);
      }
    }

    catch {
      setTimeout(() => {
        setShowSuccessMessageError(false);
      }, 3000);
    }
  }
  async function updateZona() {
    try {
      debugger;
      const response = await createApiClient().makeApiRequest("PATCH", "/zonas/" + zonaID, zonaInput);
      if (response.hasOwnProperty("error")) {
        setShowSuccessMessageError(true);
      }
      if (response.toString() == "201") {
        setShowSuccessMessageError(false);
        setShowSuccessMessage(true);
        history.push("/Zonas?farm=" + fincaID);
      } else {
        setTimeout(() => {
          setShowSuccessMessageError(false);
        }, 3000);
      }
    }

    catch {
      setTimeout(() => {
        setShowSuccessMessageError(false);
      }, 3000);
    }
  }
  async function getData() {
    const response = await createApiClient().makeApiRequest("GET", "/zonas/" + zonaID, null);
    setZonaInput(response);
  }
  const readyToSubmit = zonaInput.Nombre !== "" && zonaInput.Descripcion !== "";

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles
        txt={zonaId != undefined ? "Editar zona" : "Crea una nueva zona"}
      />

      <Form noValidate validated={readyToSubmit}>
        {showSuccessMessageError && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            Error: {errorMsg}
          </Alert>
        )}
        {showSuccessMessage && (
          <Alert severity="success" style={{ marginBottom: "10px" }}>
            Zona guardada correctamente
          </Alert>
        )}
        <CustomInput
          label="Nombre"
          placeholder="Nombre"
          typeForm="text"
          value={zonaInput.Nombre as string}
          onChange={(e) => onChange(e, "Nombre")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        <CustomInput
          label="Descripción"
          placeholder="Descripción"
          typeForm="text"
          value={zonaInput.Descripcion as string}
          onChange={(e) => onChange(e, "Descripcion")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        {zonaID == 0 ? (
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
