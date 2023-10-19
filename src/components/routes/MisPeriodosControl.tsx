import { ChangeEvent, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import createApiClient from "../../api/api-client-factory";
import { Periodo } from "../../models/Periodo";
import CustomTitles from "../widgets/CustomTitles";
import CustomInput from "../widgets/CustomInputWidget/CustomInput";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustomButtonSecondary from "../widgets/CustomButtonSecondaryWidget/CustomButtonSecondary";
import CustomDatePiker from "../widgets/CustomDatePikerWidget/CustomDatePiker";
import { useUser } from "../UserContext";
import { useHistory, useLocation } from "react-router-dom";
import { TipoRecoleccion } from "../../models/TipoRecoleccion";
import Alert from "@mui/material/Alert";
const MisPeriodosControl = () => {
  const { userId } = useUser();

  const emptyPeriodoInput: Partial<Periodo> = {
    Id: 0,
    TipoRecoleccionID: 0,
    Desde: new Date(),
    Hasta: new Date(),
    PrecioCajuela: 0,
    CaficultorID: Number(userId),
    zona: undefined,
  };

  const options = [
    { value: TipoRecoleccion.SinSeleccion, label: "Sin Selección" },
    { value: TipoRecoleccion.Granea, label: "Granea" },
    { value: TipoRecoleccion.Buena, label: "Buena" },
    { value: TipoRecoleccion.Repela, label: "Repela" },
  ];

  const [periodoInput, setPeriodoInput] =
    useState<Partial<Periodo>>(emptyPeriodoInput);

  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessMessageError, setShowSuccessMessageError] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (userId != null) {
      const queryParams = new URLSearchParams(location.search);
      const periodoString = queryParams.get("periodo");
      if (periodoString) {
        periodoInput.Id = Number(periodoString);
        periodoData();
      }
    } else {
      history.push(`/login`);
    }
  }, []);

  function onChange(
    e: ChangeEvent<HTMLInputElement>,
    attribute: keyof Periodo
  ) {
    if (attribute === "Desde" || attribute === "Hasta") {
      setPeriodoInput({
        ...periodoInput,
        [attribute]: new Date(e.target.value),
      });
    } else {
      setPeriodoInput({ ...periodoInput, [attribute]: e.target.value });
    }
  }

  function onReset() {
    setPeriodoInput(emptyPeriodoInput);
    const queryParams = new URLSearchParams(location.search);
    const zona = queryParams.get("zona");
    history.push(`/Periodos?zona=${zona}`);
  }

  const desdeDate = new Date(periodoInput.Desde ?? new Date());
  const hastaDate = new Date(periodoInput.Hasta ?? new Date());
  const readyToSubmit =
    periodoInput.TipoRecoleccionID !== 0 &&
    (periodoInput.PrecioCajuela ?? 0) > 0 &&
    (!desdeDate || !hastaDate || desdeDate.getTime() <= hastaDate.getTime());

  const handleSelect = (value: TipoRecoleccion) => {
    setPeriodoInput({ ...periodoInput, ["TipoRecoleccionID"]: value });
  };

  async function handleApiResponse(response: any) {
    if (response.message !== undefined) {
      setShowSuccessMessageError(true);
      setErrorMsg("Error en la respuesta de la API");
    } else {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        history.goBack();
      }, 2000);
    }
  }

  async function postPeriodo() {
    if (readyToSubmit) {
      try {
        periodoInput.CaficultorID = Number(userId);
        const response = await createApiClient().makeApiRequest(
          "POST",
          "/periodos",
          periodoInput
        );
        handleApiResponse(response);
      } catch (error) {
        setShowSuccessMessageError(true);
        setErrorMsg("Error en la respuesta de la API");
      }
    }
  }

  async function periodoData() {
    try {
      const response = await createApiClient().makeApiRequest(
        "GET",
        "/periodos/Periodo/" + periodoInput.Id,
        null
      );
      setPeriodoInput(response as unknown as Periodo);
    } catch {
      history.push(`/error`);
    }
  }

  async function updatePeriodo() {
    if (readyToSubmit) {
      try {
        periodoInput.CaficultorID = Number(userId);
        const response = await createApiClient().makeApiRequest(
          "PATCH",
          "/periodos/" + periodoInput.Id,
          periodoInput
        );
        handleApiResponse(response);
      } catch (error) {
        setShowSuccessMessageError(true);
        setErrorMsg("Error en la respuesta de la API");
      }
    }
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles
        txt={periodoInput.Id !== 0 ? "Editar periodo" : "Crea un nuevo periodo"}
      />

      <Form noValidate validated={readyToSubmit}>
        <Form.Label className="labelForm text-selection-disable">
          {"Tipo de Recolección"}
        </Form.Label>
        <select
          className="form-select"
          style={{ marginBottom: "10px" }}
          value={periodoInput.TipoRecoleccionID}
          onChange={(e) => handleSelect(Number(e.target.value))}
          required
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <CustomInput
          label="Pago por unidad"
          placeholder="Pago por unidad"
          typeForm="number"
          value={periodoInput.PrecioCajuela as number}
          onChange={(e) => onChange(e, "PrecioCajuela")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />

        <CustomDatePiker
          label="Desde"
          placeholder="Desde"
          valuedate={desdeDate}
          onChange={(e) => onChange(e, "Desde")}
          required
          onInvalidText={"El campo no puede estar vacío"}
        />

        <CustomDatePiker
          label="Hasta"
          placeholder="Hasta"
          valuedate={hastaDate}
          onChange={(e) => onChange(e, "Hasta")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        {showSuccessMessageError && (
          <Alert
            severity="error"
            style={{ marginBottom: "10px", marginTop: "10px" }}
          >
            Error: {errorMsg}
          </Alert>
        )}
        {showSuccessMessage && (
          <Alert
            severity="success"
            style={{ marginBottom: "10px", marginTop: "10px" }}
          >
            ¡La finca ha sido registrada exitosamente!
          </Alert>
        )}

        {periodoInput.Id != 0 ? (
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
  );
};

export default MisPeriodosControl;
