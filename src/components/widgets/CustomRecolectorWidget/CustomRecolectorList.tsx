import CustomRecolectorListElement from "./CustomRecolectorListElement";
import { Recolector } from "../../../models/Recolector";

interface CustomRecolectorListProps {
  filterTxt: string;
  recolectorList: Recolector[];
  onClick: (id: number) => void;
}
const CustomRecolectorList: React.FC<CustomRecolectorListProps> = ({
  filterTxt,
  recolectorList,
  onClick,
}) => {
  if (!recolectorList.length) {
    return (
      <div className="center">
        <p className="text-center mt-5">No hay fincas creadas</p>
      </div>
    );
  } else {
    return (
      <div className="row">
        {recolectorList
          .filter((c) => {
            const completeName = c.Nombre + " " + c.Apellidos;
            return completeName.toLowerCase().includes(filterTxt.toLowerCase());
          })
          .map((c, i) => (
            <CustomRecolectorListElement key={i} recolector={c} onClick={onClick} />
          ))}
      </div>
    );
  }
};

export default CustomRecolectorList;
