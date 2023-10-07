import { Container } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";

const Admin = () => {
  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{"Hola," + " " + "Nombre Completo"}</Title>
    </Container>
  );
};

const Title = styled(H1)`
  color: ${themes.dark.text1};
  text-align: start;
`;

export default Admin;
