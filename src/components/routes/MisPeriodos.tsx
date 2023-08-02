import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form } from "react-bootstrap";

import createApiClient from "../../api/api-client-factory";
import { Zona } from "../../models/Zona";
import { useCreateUser } from "../../hooks/useCreateUser";

import CustomTitles from "../widgets/CustomTitles";
import CustomZonaInfoDetail from "../widgets/CustomZonasWidgets/CustomZonaInfoDetail";
import CustomAdd from "../widgets/CustomAdd";
import CustomSearch from "../widgets/CustomInputWidget/CustomSearch";
import CustomPeriodoList from "../widgets/CustomPeriodosWidgets/CustomPeriodoList";
import { useHistory, useLocation } from "react-router-dom";
import { Periodo } from "../../models/Periodo";

const MisPeriodos = () => {
  const history = useHistory();
  const location = useLocation();

  const emptyZonaInput: Partial<Zona> = {
    id: 0,
    nombre: "",
    descripcion: "",
  };
  const [zonaInput, setZonaInput] = useState<Partial<Zona>>(emptyZonaInput);
  const [searchInput, setSearchInput] = useState("");

  const apiClient = useMemo(() => createApiClient(), []);
  //TODO Esto es un ejemplo
  const periodosList: Periodo[] = [
    {
      id: 1,
      TipoRecoleccionID: 1,
      Desde: new Date(),
      Hasta: new Date(),
      Value: 2,
    },
    {
      id: 2,
      TipoRecoleccionID: 2,
      Desde: new Date(),
      Hasta: new Date(),
      Value: 5,
    },
    {
      id: 3,
      TipoRecoleccionID: 3,
      Desde: new Date(),
      Hasta: new Date(),
      Value: 3,
    },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const zonaString = queryParams.get("zona");
    console.log(zonaString);
    if (zonaString) {
      setZonaInput(JSON.parse(decodeURIComponent(zonaString)));
      // Aquí puedes utilizar el objeto usuario como desees
      console.log(zonaInput);
    } else {
      // Redireccionar a otra página si el parámetro no está presente
      history.push("/error");
    }
  }, [history, location.search]);

  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function updateZona() {
    console.log("updateZona");
    const newZonaString = JSON.stringify(zonaInput);
    history.push(`/Zonas/Edit?zona=${encodeURIComponent(newZonaString)}`);
  }

  async function CreatePeriodo() {
    console.log("CreatePeriodo");
    const emptyPeriodoInput: Partial<Periodo> = {
      id: 0,
      TipoRecoleccionID: 0,
      Desde: new Date(),
      Hasta: new Date(),
      Value: 0,
    };
    const newPeriodoString = JSON.stringify(emptyPeriodoInput);
    history.push(
      `/MisPeriodos/Create?periodo=${encodeURIComponent(newPeriodoString)}`
    );
  }
  async function getDetallePeriodo() {
    console.log("DetalleZona");
    history.push("/MisPeriodos");
  }
  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Mis Periodos"} />
      <CustomZonaInfoDetail
        nombre={zonaInput.nombre ?? ""}
        descripcion={zonaInput.descripcion ?? ""}
        onClick={updateZona}
      />
      <CustomAdd onClick={CreatePeriodo} />
      <CustomSearch
        label="Buscar"
        placeholder="Buscar"
        value={searchInput}
        onChange={(e) => onChangeFilterTxt(e)}
      />
      <Container>
        <CustomPeriodoList
          filterTxt={searchInput}
          periodoList={periodosList}
          onClick={getDetallePeriodo}
        />
      </Container>
    </Container>
  );
};

export default MisPeriodos;
