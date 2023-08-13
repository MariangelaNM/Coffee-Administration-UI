import CustomFincaListElement from "./CustomFincaListElement";
import {Finca} from"../../../models/Finca"

interface CustomFincaListProps {
  filterTxt: string;
  fincasData: Finca[];
  onClick: (id: number) => void;
}
const CustomFincaList: React.FC<CustomFincaListProps> = ({
  filterTxt,
  fincasData,
  onClick,
}) => {
  if (fincasData==undefined||!fincasData.length) {
    return (
      <div className="center">
        <p className="text-center mt-5">No hay fincas creadas</p>
      </div>
    );
  } else {
    return (
      <div className="row">
        {fincasData!=undefined&& fincasData
          .filter((f) =>
            f.Descripcion.toLowerCase().includes(filterTxt.toLowerCase())
          )
          .map((f, i) => (
            <CustomFincaListElement
              key={i}
              finca={f}
              count="3"
              onClick={onClick}
            />
          ))}
      </div>
    );
  }
};

export default CustomFincaList;