import { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form } from "react-bootstrap";
import createApiClient from "../../api/api-client-factory";
import { Periodo } from "../../models/Periodo";
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
  const emptyPeriodoInput: Partial<Periodo> = {
    Id: 0,
    TipoRecoleccionID: 0,
    Desde: new Date(),
    Hasta: new Date(),
    PrecioCajuela: 0,
    CaficultorID:0,

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
  //const { create, status, error } = useCreate(apiClient.postUser);

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId != null) {
      const queryParams = new URLSearchParams(location.search);
      const periodoString = queryParams.get("periodo");
      if (periodoString) {
        setPeriodoInput(JSON.parse(decodeURIComponent(periodoString)));
      }
    }
    else {
      history.push(
        `/login`
      );
    }
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

  const desdeDate = periodoInput.Desde ? new Date(Date.parse(periodoInput.Desde)) : null;
  const hastaDate = periodoInput.Hasta ? new Date(Date.parse(periodoInput.Hasta)) : null;
  
  const readyToSubmit =
    periodoInput.TipoRecoleccionID !== 0 &&
    (periodoInput.PrecioCajuela ?? 0) > 0 &&
    (!desdeDate || !hastaDate || desdeDate.getTime() <= hastaDate.getTime());
  

 /* function displayErrorMessage() {
    if (error) {
      return <CustomAlert success={false} label={error.message} />;
    }
    return null;
  }*/
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
        txt={periodoInput.Id != 0 ? "Editar periodo" : "Crea un nuevo periodo"}
      />
     
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
          value={periodoInput.PrecioCajuela as number}
          onChange={(e) => onChange(e, "PrecioCajuela")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />

        <CustomDatePiker
          label="Desde"
          placeholder="Desde"
          valuedate={periodoInput.Desde ? new Date(periodoInput.Desde) : null} // Cambia 'null' por un valor predeterminado si lo deseas
          onChange={(e) => onChange(e, "Desde")}
          required
          onInvalidText={"El campo no puede estar vacío"}
        />

        <CustomDatePiker
          label="Hasta"
          placeholder="Hasta"
          valuedate={periodoInput.Hasta ? new Date(periodoInput.Hasta) : null} // Cambia 'null' por un valor predeterminado si lo deseas
          onChange={(e) => onChange(e, "Hasta")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
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
