import { ChangeEvent, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import createApiClient from "../../api/api-client-factory";
import { Finca } from "../../models/Finca";
import CustomTitles from "../widgets/CustomTitles";
import CustomSearch from "../widgets/CustomInputWidget/CustomSearch";
import CustomFincaList from "../widgets/CustomFincaWidgets/CustomFincaList";
import { useHistory } from "react-router-dom";
import CustomAdd from "../widgets/CustomAdd";
import { useUser } from '../UserContext';
const Farms = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const [fincasData, setFincasData] = useState<Finca[]>([]);
  const { userId } = useUser();
  useEffect(() => {
    if (userId != null) {
      callDataFinca();
    }else{
      history.push(
        `/login`
      );
    }
  }, [])

  async function callDataFinca() {
    try {
      const data = { CaficultorID: userId };
      const response = await createApiClient().makeApiRequest("PUT", "/fincas", data);
      if ('message' in response) {
        setFincasData([] as Finca[]);
      }
      else {
        setFincasData(response as Finca[]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function CreateFinca() {
    console.log("CreateFinca");
    history.push(
      `/Fincas/Create`
    );
  }

  async function getDetalleFinca(id: number) {
    history.push(`/Zonas?farm=${encodeURIComponent(id)}`);
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Mis Fincas"} />
      {<CustomAdd onClick={CreateFinca} />}
      <CustomSearch
        label="Buscar"
        placeholder="Buscar"
        value={searchInput}
        onChange={(e) => onChangeFilterTxt(e)}
      />
      <Container>
        <CustomFincaList
          filterTxt={searchInput}
          fincasData={fincasData}
          onClick={getDetalleFinca}
        />
      </Container>
    </Container>
  );
};

export default Farms;
