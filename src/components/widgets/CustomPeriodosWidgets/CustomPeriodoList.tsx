import CustomPeriodoListElement from "./CustomPeriodoListElement";
import Form from "react-bootstrap/Form";
import { Periodo } from "../../../models/Periodo";
import { TipoRecoleccion } from "../../../models/TipoRecoleccion";

interface CustomPeriodoListProps {

  filterTxt: string;
  periodoList: Periodo[];
  onClick: (id: number) => void;
}
const CustomPeriodoList: React.FC<CustomPeriodoListProps> = ({

  filterTxt,
  periodoList,
  onClick,
}) => {
  if (!periodoList.length) {
    return (
      <div className="center">
        <p className="text-center mt-5">No hay periodos creados</p>
      </div>
    );
  } else {
    
    return (

      <div className="row">
        {periodoList
          .filter((p)=>
          {
            const tipoRecoleccionValue = TipoRecoleccion[p.TipoRecoleccionID];
            return (
              tipoRecoleccionValue &&
              tipoRecoleccionValue.toLowerCase().includes(filterTxt.toLowerCase())

            );
          })
          .map((p, i) => (
            <CustomPeriodoListElement key={i} periodo={p} onClick={onClick} />
          ))}

      </div>

    );
  }
};

export default CustomPeriodoList;
