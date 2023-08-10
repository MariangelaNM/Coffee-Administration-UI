import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form } from "react-bootstrap";

import createApiClient from "../../api/api-client-factory";
import { Farm } from "../../models/Farm";
import { useCreateUser } from "../../hooks/useCreateUser";

import CustomTitles from "../widgets/CustomTitles";
import CustomAdd from "../widgets/CustomAdd";
import CustomSearch from "../widgets/CustomInputWidget/CustomSearch";
import CustomFincaList from "../widgets/CustomFincaWidgets/CustomFincaList";
import CustomAlert from "../widgets/CustomAlert";

import { useHistory } from "react-router-dom";

const Farms = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const apiClient = useMemo(() => createApiClient(), []);
  const { create, status, error } = useCreateUser(apiClient.postUser);
  //TODO Esto es un ejemplo
  const FincaList: Farm[] = [
    {
      id: 1,
      nombre: "Finca A",
      descripcion: "Descripción de Finca A",
      ubicacion: "Ubicacion de Finca A",
    },
    {
      id: 2,
      nombre: "Finca B",
      descripcion: "Descripción de Finca B",
      ubicacion: "Ubicacion de Finca B",
    },
    {
      id: 3,
      nombre: "Finca C",
      descripcion: "Descripción de Finca C",
      ubicacion: "Ubicacion de Finca C",
    },
  ];

  useEffect(() => {
    if (status === "success") {
      console.log("Creacion exitosa");
    } else {
      //console.log(error);
    }
    // return () => {};
  }, [status]);

  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function CreateFinca() {
    console.log("CreateFinca");
    const emptyFincaInput: Partial<Farm> = {
      id: 0,
      nombre: "",
      descripcion: "",
      ubicacion: "",
    };
    const newFincaString = JSON.stringify(emptyFincaInput);
    history.push(
      `/Mis Fincas/Create?farm=${encodeURIComponent(newFincaString)}`
    );
  }
  async function getDetalleFinca(id: number) {
    console.log("DetalleFinca");
    console.log(id);
    const selectedFinca = FincaList.find((finca) => finca.id === id);

    const selectedFincaString = JSON.stringify(selectedFinca);
    history.push(`/Zonas?farm=${encodeURIComponent(selectedFincaString)}`);
  }
  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Mis fincas"} />
      <CustomAdd onClick={CreateFinca} />
      <CustomSearch
        label="Buscar"
        placeholder="Buscar"
        value={searchInput}
        onChange={(e) => onChangeFilterTxt(e)}
      />
      <Container>
        <CustomFincaList
          filterTxt={searchInput}
          farmList={FincaList}
          onClick={getDetalleFinca}
        />
      </Container>
    </Container>
  );
};

export default Farms;
