import CustomColectorListElement from "./CustomColectorListElement";
import { Colector } from "../../../models/Colector";

interface CustomColectorListProps {
  filterTxt: string;
  colectorList: Colector[];
  onClick: (id: number) => void;
}
const CustomColectorList: React.FC<CustomColectorListProps> = ({
  filterTxt,
  colectorList,
  onClick,
}) => {
  if (!colectorList.length) {
    return (
      <div className="center">
        <p className="text-center mt-5">No hay fincas creadas</p>
      </div>
    );
  } else {
    return (
      <div className="row">
        {colectorList
          .filter((c) => {
            const completeName = c.nombre + " " + c.apellido;
            return completeName.toLowerCase().includes(filterTxt.toLowerCase());
          })
          .map((c, i) => (
            <CustomColectorListElement key={i} colector={c} onClick={onClick} />
          ))}
      </div>
    );
  }
};

export default CustomColectorList;
