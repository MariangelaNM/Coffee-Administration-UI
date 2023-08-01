import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form } from "react-bootstrap";

import createApiClient from "../../api/api-client-factory";
import { Zona } from "../../models/Zona";
import { useCreateUser } from "../../hooks/useCreateUser";

import CustomTitles from "../widgets/CustomTitles";
import CustomFincaInfoDetail from "../widgets/CustomFincaWidgets/CustomFincaInfoDetail";
import CustomAdd from "../widgets/CustomAdd";
import CustomSearch from "../widgets/CustomInputWidget/CustomSearch";
import CustomZonaList from "../widgets/CustomZonasWidgets/CustomZonaList";
import CustomAlert from "../widgets/CustomAlert";

//import { useNavigate } from 'react-router';
import { useHistory } from "react-router-dom";

const Zonas = () => {
  const history = useHistory();
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
    //TODO  history.push('/Mis Fincas/Edit')
    //history.push('/')
  }
  async function CreateZona() {
    console.log("CreateZona");
    const emptyZonaInput: Partial<Zona> = {
      id:0,
      nombre: "",
      descripcion: "",
    };
    const newZonaString = JSON.stringify(emptyZonaInput);
    history.push(`/Zonas/Create?zona=${encodeURIComponent(newZonaString)}`);

  }
  async function getDetalleZona(id: number) {
    console.log("DetalleZona");
    console.log(id);
    const selectedZona= zonaList.find((zona) => zona.id === id);

    const selectedZonaString = JSON.stringify(selectedZona);
    history.push(`/MisPeriodos?zona=${encodeURIComponent(selectedZonaString)}`);
  }
  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Mis zonas"} />
      <CustomFincaInfoDetail
        nombre={"Lorem ipsum dolor sit amet."}
        descripcion={"Aliquam egestas elementum sodales."}
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
