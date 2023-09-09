import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Container, Form } from "react-bootstrap";
import createApiClient from "../../api/api-client-factory";
import { Recolector } from "../../models/Recolector";
import CustomTitles from "../widgets/CustomTitles";
import CustomAdd from "../widgets/CustomAdd";
import CustomSearch from "../widgets/CustomInputWidget/CustomSearch";
import CustomRecolectorList from "../widgets/CustomRecolectorWidget/CustomRecolectorList";
import { useHistory } from "react-router-dom";

const Recolectores = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const [recolectoresData, setRecolectoresData] = useState<Recolector[]>([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId != null) {
      callDataRecolector();
    }else{
      history.push(
        `/login`
      );
    }
  }, [])

  async function callDataRecolector() {
    try {
      
      const response = await createApiClient().makeApiRequest("GET", `/recolectores/${localStorage.getItem('id')}/caficultor`, null);

      if ('message' in response) {
        setRecolectoresData([] as Recolector[]);
      }
      else {
        setRecolectoresData(response as Recolector[]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function CreateColector() {

    history.push(
      `/Mis Recolectores/Create`
    );
  }
  async function EditColector(id: number) {
    console.log("EditColector");
    console.log(id);
    const selectedColector = recolectoresData.find((colector) => colector.Id === id);

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
        <CustomRecolectorList
          filterTxt={searchInput}
          recolectorList={recolectoresData}
          onClick={EditColector}
        />
      </Container>
    </Container>
  );
};

export default Recolectores;
