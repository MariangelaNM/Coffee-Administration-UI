
import { ChangeEvent, FormEvent, useState } from "react";
import { Container, Form } from "react-bootstrap";
import CustomTitles from "../widgets/CustomTitles";
import CustomInput from "../widgets/CustomInputWidget/CustomInput";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustomButtonSecondary from "../widgets/CustomButtonSecondaryWidget/CustomButtonSecondary";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";

const RecoverPass = () => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessMessageError, setShowSuccessMessageError] = useState(false);

  const readyToSubmit = mail !== "" ;
    
  function onReset() {
    setMail("");
    history.push("/login");
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  function onChangeMail(e: ChangeEvent<HTMLInputElement>) {
    setMail(e.target.value);
  }

  async function SendMail() {
    console.log("enviarMail");
  }


  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Recuperar contraseña"} />
      {showSuccessMessageError && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Error con su correo
        </Alert>
      )}
      {showSuccessMessage && (
        <Alert severity="success" style={{ marginBottom: "10px" }}>
         Hemos enviado un correo con los pasos para recuperar tu contraseña
        </Alert>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <CustomInput
          label="Correo"
          placeholder="Correo"
          typeForm="email"
          value={mail}
          onChange={onChangeMail}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        <div className="d-grid gap-2">
          <CustomButtonPrimary
            label="Enviar"
            onClick={() => {
              SendMail();
            }}
            disabled={!readyToSubmit} //status === "loading" ||
          />
          <CustomButtonSecondary label="Cancelar" onClick={() => onReset()} />
        </div>
      </Form>
    </Container>
  );
};

export default RecoverPass;
