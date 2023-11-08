
import { Container,  } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustomTitles from "../widgets/CustomTitles";
import CustomRecoleccionList from "../widgets/CustomRecoleccionWidgets/CustomRecoleccionList";
import { Recoleccion } from "../../models/Recoleccion";
import CustomPagoResumen from "../widgets/CustomPagosWidget/CustomPagoResumen";

const RecolectorPago = () => {
  const history = useHistory();
 // const [searchInput, setSearchInput] = useState("");

//  const { recolectorId } = useParams();

  // Datos de ejemplo de Recolección para un mismo recolector
  const RecoleccionList: Recoleccion[] = [
   
  ];


  return (
    <Container className="col-lg-6 col-xxl-8 my-5 mx-auto">
      <CustomTitles txt="Nombre del Recolector" />
      <Container>
        <CustomPagoResumen
        nombreZona={"Nombre Zona"}
        periodo={1}
        total={120}
        cuartillos={1}
        cajuelas={10}
      />
      </Container>
       <div className="d-grid gap-2">
        <CustomButtonPrimary
          label="Pagar Pendientes"
          onClick={() => {
            history.push("/PeriodoPago");
          }}
          disabled={false}
        />
      </div>
      <Container>
        <CustomRecoleccionList
          filterTxt={"searchInput"}
          recoleccionList={RecoleccionList}
        />
      </Container>
    </Container>
  );
};



export default RecolectorPago;
