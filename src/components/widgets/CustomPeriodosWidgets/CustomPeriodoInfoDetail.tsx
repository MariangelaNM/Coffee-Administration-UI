import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";
import "../Customicon.scss";

interface CustomPeriodoInfoDetailProps {
  nombreZona: string;
  periodo: string;
  descripcion: string;
}

const CustomPeriodoInfoDetail: React.FC<CustomPeriodoInfoDetailProps> = ({
  nombreZona,
  periodo,
  descripcion,
}) => {
  return (
    <div className="data-item">
      <Row>
        <Col className="flex-grow-1">
          <Col className="d-flex mt-2">
            <TitleTag className="text-selection-disable">Zona:</TitleTag>
            <div style={{ marginLeft: "5px" }}>
              <Title className="text-selection-disable">{nombreZona}</Title>
            </div>
          </Col>
          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Periodo:
            </DescriptionTag>
            <div style={{ marginLeft: "5px" }}>
              <Description className="text-selection-disable">
                {periodo}
              </Description>
            </div>
          </Col>
          <Col className="d-flex mt-2">
            <DescriptionTag className="text-selection-disable">
              Descripcion:
            </DescriptionTag>
            <div style={{ marginLeft: "5px" }}>
              <Description className="text-selection-disable">
                {descripcion}
              </Description>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

const Title = styled(H3)`
  color: ${themes.dark.text1};
  text-align: start;
`;
const TitleTag = styled(H3)`
  color: ${themes.dark.cafe_medio};
  text-align: start;
`;
const Description = styled(MediumText)`
  color: ${themes.dark.text1};
  text-align: start;
`;
const DescriptionTag = styled(MediumText)`
  color: ${themes.dark.cafe_medio};
  text-align: start;
`;
export default CustomPeriodoInfoDetail;
