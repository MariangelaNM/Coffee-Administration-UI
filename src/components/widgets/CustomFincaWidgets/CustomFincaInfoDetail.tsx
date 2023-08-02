import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../../styles/ColorStyles";
import { H3, MediumText } from "../../../styles/TextStyles";
import { FiEdit } from "react-icons/fi";
import "../Customicon.scss";

interface CustomFincaInfoDetailProps {
  nombre: string;
  descripcion: string;
  onClick: () => void;
}

const CustomFincaInfoDetail: React.FC<CustomFincaInfoDetailProps> = ({
  nombre,
  descripcion,
  onClick,
}) => {
  return (
    <Row>
      <Col className="flex-grow-1">
        <Title>{nombre}</Title>
        <Description>{descripcion}</Description>
      </Col>
      <Col xs={2} sm={1} className="text-right">
        <FiEdit className="custom-icon" onClick={onClick} />
      </Col>
    </Row>
  );
};

const Title = styled(H3)`
  color: ${themes.dark.text1};
  text-align: start;
`;

const Description = styled(MediumText)`
  color: ${themes.dark.text1};
  text-align: start;
`;
export default CustomFincaInfoDetail;
