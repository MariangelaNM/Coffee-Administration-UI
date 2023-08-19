
import { ChangeEvent, FormEvent, useState } from "react";
import { Container, Form } from "react-bootstrap";
import CustomTitles from "../widgets/CustomTitles";
import CustomInput from "../widgets/CustomInputWidget/CustomInput";
import CustomPasswordInput from "../widgets/CustomInputWidget/CustomPasswordInput";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustomButtonSecondary from "../widgets/CustomButtonSecondaryWidget/CustomButtonSecondary";
import createApiClient from "../../api/api-client-factory";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const readyToSubmit = mail !== "" && password !== "";
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessMessageError, setShowSuccessMessageError] = useState(false);

  function onReset() {
    setMail("");
    setPassword("");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  async function callLoggin() {
    try {
      const body = {
        "email": mail,
        "contrasena": password
      }

      const response = await createApiClient().makeApiRequest("POST", "/authentication/login", body);

      if ("message" in response) {
        setShowSuccessMessageError(true);
      } else {
        setShowSuccessMessageError(false);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          history.push("");
        }, 2000);
      }
    } catch (error) {
      setShowSuccessMessageError(true);
    }
  }


  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Ingresar"} />
      {showSuccessMessageError && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Error con su Correo y Contraseña
        </Alert>
      )}
      {showSuccessMessage && (
        <Alert severity="success" style={{ marginBottom: "10px" }}>
          ¡Bienbenid@!
        </Alert>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <CustomInput
          label="Nombre"
          placeholder="Nombre"
          typeForm="email"
          value={mail}
          onChange={onChangeMail}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        <CustomPasswordInput
          label="Contraseña"
          placeholder="Contraseña"
          value={password}
          onChange={onChangePassword}
          required
          confirmPasswordValid={true}
          togglePasswordVisibility={togglePasswordVisibility}
          showPassword={showPassword}
          onInvalidText={""}
        />
        <div className="d-grid gap-2">
          <CustomButtonPrimary
            label="Registrar"
            onClick={() => {
              console.log("Login");
              callLoggin();
            }}
            disabled={!readyToSubmit} //status === "loading" ||
          />
          <CustomButtonSecondary label="Cancelar" onClick={() => onReset()} />
        </div>
      </Form>
    </Container>
  );
};

export default Login;
