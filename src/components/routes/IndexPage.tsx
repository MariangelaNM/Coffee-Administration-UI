import { Container, Row, Col } from "react-bootstrap";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import logoCompleto from "../../assets/logoCompleto.png";
import foto from "../../assets/cafeFondo.jpeg";
import { useHistory } from "react-router-dom";

const IndexPage = () => {
  const history = useHistory();
  return (
    <div
      style={{
        backgroundImage: `url(${foto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="cover-container  d-flex w-100 h-100 p-3 mx-auto flex-column"
    >
      <Container
        style={{
          width: `100vw`,
          height: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
        className="cover-inner-container col-lg-6 col-xxl-4 my-5 mx-auto "
      >
        <Row className="justify-content-center">
          <Col md="6" className="text-center">
            <img src={logoCompleto} alt="Column Image" />
            <h1 className="cover-heading mt-4 mb-4 ">
              Cada granito de café cuenta.
            </h1>
          </Col>
          <div className="d-grid gap-2">
            <CustomButtonPrimary
              label="Iniciar Sesión"
              onClick={() => {
                history.push("/login");
              }}
              disabled={false}
            />
            <CustomButtonPrimary
              label="Registrar"
              onClick={() => {
                history.push("/signup");
              }}
              disabled={false}
            />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default IndexPage;
