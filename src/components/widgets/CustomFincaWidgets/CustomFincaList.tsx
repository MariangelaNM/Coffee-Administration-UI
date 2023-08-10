import CustomFincaListElement from "./CustomFincaListElement";
import { Farm } from "../../../models/Farm";

interface CustomFincaListProps {
  filterTxt: string;
  farmList: Farm[];
  onClick: (id: number) => void;
}
const CustomFincaList: React.FC<CustomFincaListProps> = ({
  filterTxt,
  farmList,
  onClick,
}) => {
  if (!farmList.length) {
    return (
      <div className="center">
        <p className="text-center mt-5">No hay fincas creadas</p>
      </div>
    );
  } else {
    return (
      <div className="row">
        {farmList
          .filter((f) =>
            f.nombre.toLowerCase().includes(filterTxt.toLowerCase())
          )
          .map((f, i) => (
            <CustomFincaListElement
              key={i}
              farm={f}
              count="3"
              onClick={onClick}
            />
          ))}
      </div>
    );
  }
};

export default CustomFincaList;