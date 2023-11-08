import  { ChangeEvent, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import CustomTitles from "../widgets/CustomTitles";
import CustomInput from "../widgets/CustomInputWidget/CustomInput";
import CustomPagoList from "../widgets/CustomPagosWidget/CustomPagoList"; // Nuevo widget de pagos
//import { useHistory } from 'react-router-dom';
import { Pago } from "../../models/Pago"; // Nuevo modelo de pago



// Define datos simulados de recolectores
const PagoList: Pago[] = [
  {
    Id: 1,
    Nombre: "Pedro",
    Apellido: "Perez",
    Total: 500,
    Pagado: "Sí",
  },
  {
    Id: 2,
    Nombre: "Pepito",
    Apellido: "Rodriguez",
    Total: 750,
    Pagado: "No",
  },
  {
    Id: 3,
    Nombre: "Juan",
    Apellido: "Suarez",
    Total: 600,
    Pagado: "Sí",
  },
];

const PagosPendientes = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredPagos, setFilteredPagos] = useState<Pago[]>([]); // Estado para los pagos filtrados
  //const history = useHistory();

  useEffect(() => {
    // Puedes agregar aquí cualquier efecto secundario que desees realizar al cargar el componente.
    // Por ejemplo, puedes establecer los pagos iniciales aquí.
    setFilteredPagos(PagoList);
  }, []);

  function onChangeFilterTxt(e: ChangeEvent<HTMLInputElement>) {
    const searchText = e.target.value;
    setSearchInput(searchText);

    // Filtrar la lista de pagos en función del texto de búsqueda
    const filtered = PagoList.filter((pago) => {
      const nombreCompleto = `${pago.Nombre} ${pago.Apellido}`;
      return nombreCompleto.toLowerCase().includes(searchText.toLowerCase());
    });

    setFilteredPagos(filtered);
  }

 

  return (
    <Container className="col-lg-6 col-xxl-8 my-5 mx-auto">
      <CustomTitles txt="Pagos Pendientes" />
     {/* <CustomPeriodoListElement
        periodo={"Nombre del periodo"}
        descripcion={"Descripcion del periodo"}
      
  />*/}

      <Form>
        <CustomInput
          label="Buscar por nombre"
          placeholder="Buscar"
          typeForm="text"
          value={searchInput}
          onChange={(e) => onChangeFilterTxt(e)}
          onInvalidText={""}
        />
      </Form>
      <CustomPagoList pagos={filteredPagos} /*onClick={onViewDetailsClick} *//>
    </Container>
  );
};

export default PagosPendientes;