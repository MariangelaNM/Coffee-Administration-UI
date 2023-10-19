import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { SmallText } from "../../../styles/TextStyles";
import { Pago } from "../../models/Pago";

interface CustomPagoListProps {
  pagos: Pago[];
}

const CustomPagoList: React.FC<CustomPagoListProps> = ({ pagos }) => {
  return (
    <Container>
      {pagos.length > 0 ? (
        pagos.map((pago, index) => (
          <div key={index} className="detail-card mb-2">
            <Row className="mt-1 mb-1 align-items-center">
              <Col className="d-flex flex-column justify-content-center">
                <Col className="d-flex">
                  <TitleTag className="text-selection-disable">Nombre:</TitleTag>
                  <div style={{ marginLeft: "4px" }}>
                    <Title className="text-selection-disable">
                      {pago.Nombre} {pago.Apellido}
                    </Title>
                  </div>
                </Col>

                <Col className="d-flex mt-0">
                  <DescriptionTag className="text-selection-disable">
                    Total:
                  </DescriptionTag>
                  <div style={{ marginLeft: "4px" }}>
                    <Description className="text-selection-disable">
                      {"$" + pago.Total}
                    </Description>
                  </div>
                </Col>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="d-flex align-items-center">
                <DescriptionTag className="text-selection-disable">
                </DescriptionTag>
                <div style={{ marginLeft: "100px" }}>
                  {pago.Pagado === "Sí" ? (
                    <FiCheckCircle color="green" />
                  ) : (
                    <FiXCircle color="red" />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        ))
      ) : (
        <div className="center">
          <p className="text-center mt-5">No hay pagos disponibles</p>
        </div>
      )}
    </Container>
  );
};

const Title = styled(SmallText)`
  color: ${themes.dark.text1};
  text-align: start;
`;

const TitleTag = styled(SmallText)`
  color: ${themes.dark.cafe_medio};
  text-align: start;
`;

const Description = styled(SmallText)`
  color: ${themes.dark.text1};
  text-align: start;
`;

const DescriptionTag = styled(SmallText)`
  color: ${themes.dark.cafe_medio};
  text-align: start;
`;

export default CustomPagoList;
