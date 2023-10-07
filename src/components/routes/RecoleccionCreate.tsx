import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import { Recolector } from "../../models/Recolector";
import { Recoleccion } from "../../models/Recoleccion";
import { useUser } from '../UserContext';
import createApiClient from "../../api/api-client-factory";
import Alert from "@mui/material/Alert/Alert";
import { useHistory } from "react-router-dom";

const RecoleccionCreate = () => {
  const [recoleccion, setRecoleccion] = useState<Recoleccion>({
    ZonaID: 0,
    RecolectorID: 0,
    PeriodoID: 0,
    Cajuelas: 0,
    Cuartillos: 0,
    total: 0,
    pagado: "",
    Id: 0,
    status: false
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [recolectoresData, setRecolectoresData] = useState<Recolector[]>([]);
  const { userId } = useUser();
  const history = useHistory();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        debugger
        let response:any;
        recoleccion.total =
        ((recoleccion.Cajuelas ?? 0) * (Number(localStorage.getItem("Costo"))??0)) +
        (((recoleccion.Cuartillos ?? 0) * 0.25) *  (Number(localStorage.getItem("Costo"))??0));
      
        if(recoleccion.Id==0){
         response = await createApiClient().makeApiRequest("POST", "/registros", recoleccion);}
        else{
          response = await createApiClient().makeApiRequest("PATCH", "/registros/"+recoleccion.Id, recoleccion);}

        if (response.message != undefined) {
          setShowErrorMessage(true);
          e.stopPropagation();
          setValidated(true);
          setErrorMsg("Error en la respuesta de la API");
        } else {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            history.push(`/RecoleccionPeriodo?`+encodeURIComponent(`periodo=`+recoleccion.PeriodoID+`&zona=`+recoleccion.ZonaID+`&costo=`+ Number(localStorage.getItem("Costo"))??0));

          }, 2000);
        }
      } catch (error) {
        setShowErrorMessage(true);
        e.stopPropagation();
        setValidated(true);
        setErrorMsg("Error en la respuesta de la API");
      }

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  useEffect(() => {

    const fechaActual = new Date();
    const queryParams = new URLSearchParams(decodeURIComponent(location.search));
    const periodo = parseInt(decodeURIComponent(queryParams.get("periodo") ?? "0"), 10);
    const zona = parseInt(decodeURIComponent(queryParams.get("zona") ?? "0"), 10);
    const Id = parseInt(decodeURIComponent(queryParams.get("id") ?? "0"), 10);
   
    setRecoleccion({
      ZonaID: zona,
      RecolectorID: 0,
      PeriodoID: periodo,
      Cajuelas: 0,
      Cuartillos: 0,
      total: 0,
      pagado: "",
      Id: Id,
      Creado: fechaActual,
      Modificado: fechaActual,
      status: false,
      costo:Number(localStorage.getItem("Costo"))??0
    });
    recoleccion.Id=Id;
    callDataRecolector();
    if(Id!=0){
      callDataRecolecion();
    }

  }, []);
  async function callDataRecolecion() {
    try {
      const response = await createApiClient().makeApiRequest(
        "GET",
        `/registros/${recoleccion.Id}/recolecciones`,
        null
      );
      if ("message" in response) {
        setRecoleccion( response as Recoleccion);
      } else {
        setRecoleccion(response[0] as Recoleccion);
      }
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function callDataRecolector() {
    try {
      const response = await createApiClient().makeApiRequest(
        "GET",
        `/recolectores/${userId}/caficultor`,
        null
      );
      if ("message" in response) {
        setRecolectoresData([] as Recolector[]);
      } else {
        setRecolectoresData(response as Recolector[]);
      
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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

  const handleKeyPress = (event: {
    target: any;
    key: any;
    preventDefault: () => void;
  }) => {
    const allowedKeys = new Set(['0', '1', '2', '3', '4']);
    const key = event.key;
    const currentValue = event.target.value;
    if (currentValue.length === 1 || !allowedKeys.has(key)) {
      event.preventDefault();
    }
  };

  const handleSelect = (id: number) => {
    setRecoleccion({ ...recoleccion, RecolectorID: id });
  };
  const handleCancel = () => {
    const queryParams = new URLSearchParams(decodeURIComponent(location.search));
    const periodo = parseInt(decodeURIComponent(queryParams.get("periodo") ?? "0"), 10);
    const zona = parseInt(decodeURIComponent(queryParams.get("zona") ?? "0"), 10);
    history.push(`/RecoleccionPeriodo?`+encodeURIComponent(`periodo=`+periodo+`&zona=`+zona+`&costo=`+ Number(localStorage.getItem("Costo"))??0 ));
  };
  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{recoleccion.Id==0&&"Nuevo Registro"}{recoleccion.Id!=0&&"Modificar Registro"}</Title>
      {displayErrorMessage()}
      <Form noValidate validated={validated} onSubmit={handleSubmit} >
        <select
          className="form-select"
          style={{ marginBottom: "10px" }}
          value={recoleccion?.RecolectorID}
          onChange={(e) => handleSelect(Number(e.target.value))}
          required
        >
          <option value="">Selecciona un recolector</option> {/* Opción predeterminada */}
          {recolectoresData.map((option) => (
            <option key={option.Id} value={option.Id}>
              {option.Nombre}
            </option>
          ))}
        </select>


        <Form.Group className="mb-3" controlId="formCosto">
          <Form.Label>Costo Unitario (₡)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Valor por cada cajuela (₡)"
            min={1}
            value={recoleccion.costo}
            onChange={handleInputChange("costo")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede ser 0
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCajuelas">
          <Form.Label>Cajuelas</Form.Label>
          <Form.Control
            type="number"
            placeholder="Cantidad de Cajuelas"
            value={recoleccion?.Cajuelas}
            onChange={handleInputChange("Cajuelas")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacío
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCuartillo">
          <Form.Label>Cuartillos</Form.Label>
          <Form.Control
            type="number"
            maxLength={1}
            min={0}
            max={4}
            step={1}
            placeholder="Cantidad de Cuartillos"
            value={recoleccion?.Cuartillos}
            onChange={handleInputChange("Cuartillos")}
            onKeyPress={handleKeyPress}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede ser menor a 0 o mayor a 4
          </Form.Control.Feedback>
        </Form.Group>
        {showSuccessMessage && (
          <Alert severity="success" style={{ marginBottom: "10px", marginTop: "10px" }}>
            ¡La Recolección ha sido registrada exitosamente!
          </Alert>
        )}
        {showErrorMessage && (
          <Alert severity="error" style={{ marginBottom: "10px", marginTop: "10px" }}>
            ¡La Recolección no se pudo registrar!
          </Alert>
        )}
        <div className="d-grid gap-2">
          <Button variant="primary" className="custombtn-primary no-active-style" type="submit">
          {recoleccion.Id==0&&"Registrar"}{recoleccion.Id!=0&&"Actualizar"}
          </Button>

          <Button
            variant="primary"
            className="custombtn-secondary"
            type="button" // Cambié "Abort" a "button"
            onClick={handleCancel} // Agregué el manejador de eventos onClick
          >
            Cancelar
          </Button>
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
