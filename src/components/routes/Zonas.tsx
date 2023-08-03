import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form } from "react-bootstrap";

import createApiClient from "../../api/api-client-factory";
import { Farm } from "../../models/Farm";
import { Zona } from "../../models/Zona";
import { useCreateUser } from "../../hooks/useCreateUser";

import CustomTitles from "../widgets/CustomTitles";
import CustomFincaInfoDetail from "../widgets/CustomFincaWidgets/CustomFincaInfoDetail";
import CustomAdd from "../widgets/CustomAdd";
import CustomSearch from "../widgets/CustomInputWidget/CustomSearch";
import CustomZonaList from "../widgets/CustomZonasWidgets/CustomZonaList";
import CustomAlert from "../widgets/CustomAlert";

import { useHistory, useLocation } from "react-router-dom";

const Zonas = () => {
  const history = useHistory();
  const location = useLocation();

  const emptyFarmInput: Partial<Farm> = {
    id: 0,
    nombre: "",
    descripcion: "",
  };

  const [fincaInput, setFincaInput] = useState<Partial<Farm>>(emptyFarmInput);

  const [searchInput, setSearchInput] = useState("");
  const apiClient = useMemo(() => createApiClient(), []);
  const { create, status, error } = useCreateUser(apiClient.postUser);
  //TODO Esto es un ejemplo
  const zonaList: Zona[] = [
    {
      id: 1,
      nombre: "Zona A",
      descripcion: "Descripción de Zona A",
    },
    {
      id: 2,
      nombre: "Zona B",
      descripcion: "Descripción de Zona B",
    },
    {
      id: 3,
      nombre: "Zona C",
      descripcion: "Descripción de Zona C",
    },
    // Agrega más objetos Zona según sea necesario
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fincaString = queryParams.get("farm");

    if (fincaString) {
      setFincaInput(JSON.parse(decodeURIComponent(fincaString)));
      // Aquí puedes utilizar el objeto usuario como desees
      console.log(fincaInput);
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
  }, [status]);

  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function updateFinca() {
    console.log("updateFinca");
    const newFarmString = JSON.stringify(fincaInput);
    history.push(`/Mis Fincas/Edit?farm=${encodeURIComponent(newFarmString)}`);
  }

  async function CreateZona() {
    console.log("CreateZona");
    const emptyZonaInput: Partial<Zona> = {
      id: 0,
      nombre: "",
      descripcion: "",
    };
    const newZonaString = JSON.stringify(emptyZonaInput);
    history.push(`/Zonas/Create?zona=${encodeURIComponent(newZonaString)}`);
  }
  async function getDetalleZona(id: number) {
    console.log("DetalleZona");
    console.log(id);
    const selectedZona = zonaList.find((zona) => zona.id === id);

    const selectedZonaString = JSON.stringify(selectedZona);
    history.push(`/MisPeriodos?zona=${encodeURIComponent(selectedZonaString)}`);
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Mis zonas"} />
      <CustomFincaInfoDetail
        nombre={fincaInput.nombre ?? ""}
        descripcion={fincaInput.descripcion ?? ""}
        onClick={updateFinca}
      />
      <CustomAdd onClick={CreateZona} />
      <CustomSearch
        label="Buscar"
        placeholder="Buscar"
        value={searchInput}
        onChange={(e) => onChangeFilterTxt(e)}
      />
      <Container>
        <CustomZonaList
          filterTxt={searchInput}
          zonaList={zonaList}
          onClick={getDetalleZona}
        />
      </Container>
    </Container>
  );
};

export default Zonas;
