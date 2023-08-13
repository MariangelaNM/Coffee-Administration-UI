import CustomZonaListElement from "./CustomZonaListElement";
import { Zona } from "../../../models/Zona";

interface CustomZonaListProps {
  filterTxt: string;
  zonaList: Zona[];
  onClick: (id: number) => void;
}
const CustomZonaList: React.FC<CustomZonaListProps> = ({
  filterTxt,
  zonaList,
  onClick,
}) => {
  if (!zonaList.length) {
    return (
      <div className="center">
        <p className="text-center mt-5">No hay zonas creadas</p>
      </div>
    );
  } else {
    return (
      <div className="row">
        {zonaList
          .filter((z) =>
            z.Nombre.toLowerCase().includes(filterTxt.toLowerCase())
          )
          .map((z, i) => (
            <CustomZonaListElement
              key={i}
              zona={z}
              count="3"
              onClick={onClick}
            />
          ))}
      </div>
    );
  }
};

export default CustomZonaList;
