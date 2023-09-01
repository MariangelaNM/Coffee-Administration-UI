import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import { FiPlus } from "react-icons/fi";
import "./Customicon.scss";

interface CustomAddProps {
  onClick: () => void;
}

const CustomAdd: React.FC<CustomAddProps> = ({ onClick }) => {
  return (
    <Container>
      <Row>
        <Col className="flex-grow-1"></Col>
        <Col xs={2} sm={1}>
      
            <FiPlus className="custom-icon-big" onClick={onClick} />
       
        </Col>
      </Row>
    </Container>
  );
};

export default CustomAdd;
