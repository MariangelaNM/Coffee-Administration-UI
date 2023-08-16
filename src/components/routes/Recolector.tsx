import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form } from "react-bootstrap";

import createApiClient from "../../api/api-client-factory";
import { Colector } from "../../models/Colector";
import { useCreateUser } from "../../hooks/useCreateUser";
import CustomTitles from "../widgets/CustomTitles";
import CustomAdd from "../widgets/CustomAdd";
import CustomSearch from "../widgets/CustomInputWidget/CustomSearch";
import CustomColectorList from "../widgets/CustomColectorWidget/CustomColectorList";
import CustomAlert from "../widgets/CustomAlert";

import { useHistory } from "react-router-dom";

const Recolector = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const apiClient = useMemo(() => createApiClient(), []);

  //const { create, status, error } = useCreate(apiClient.postUser);

  //TODO Esto es un ejemplo
  const ColectorList: Colector[] = [
    {
      id: 1,
      nombre: "Nombre1",
      apellido: "Apellido1",
      identificacion: "12345asdf",
      telefono:123455
    },
    {
      id: 2,
      nombre: "Nombre2",
      apellido: "Apellido2",
      identificacion: "12345asdf",
      telefono:123455
    },
    {
      id: 3,
      nombre: "Nombre3",
      apellido: "Apellido3",
      identificacion: "12345asdf",
      telefono:123455
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

  async function CreateColector() {
    console.log("CreateColector");
    const emptyColectorInput: Partial<Colector> = {
      id: 0,
      nombre: "",
      apellido: "",
      identificacion: "",
      telefono:0
    };
    const newColectorString = JSON.stringify(emptyColectorInput);
    history.push(
      `/Mis Recolectores/Create?colector=${encodeURIComponent(newColectorString)}`
    );
  }
  async function EditColector(id: number) {
    console.log("EditColector");
    console.log(id);
    const selectedColector = ColectorList.find((colector) => colector.id === id);

    const selectedColectorString = JSON.stringify(selectedColector);
    history.push(`/Mis Recolectores/Edit?colector=${encodeURIComponent(selectedColectorString)}`);
  }
  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Mis recolectores"} />
      <CustomAdd onClick={CreateColector} />
      <CustomSearch
        label="Buscar"
        placeholder="Buscar"
        value={searchInput}
        onChange={(e) => onChangeFilterTxt(e)}
      />
      <Container>
        <CustomColectorList
          filterTxt={searchInput}
          colectorList={ColectorList}
          onClick={EditColector}
        />
      </Container>
    </Container>
  );
};

export default Recolector;
