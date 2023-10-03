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
import { useUser } from "../UserContext";
import Button from "react-bootstrap/Button";

const Login = () => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const readyToSubmit = mail !== "" && password !== "";
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessMessageError, setShowSuccessMessageError] = useState(false);
  const { setUserId } = useUser();

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
    localStorage.clear();
    try {
      const body = {
        email: mail,
        contrasena: password,
      };

      const response = await createApiClient().makeApiRequest(
        "POST",
        "/authentication/login",
        body
      );

      if ("message" in response) {
        setShowSuccessMessageError(true);
      } else {
        setShowSuccessMessageError(false);
        localStorage.setItem("token", response?.token); // Guarda el userId en el local storage
        setUserId(response?.id);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          history.push("/Inicio");
        }, 2000);
      }
    } catch (error) {
      setShowSuccessMessageError(true);
    }
  }
  async function GotoRecoverPass() {
    setShowSuccessMessage(false);
    history.push("/RecoverPass");
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
          ¡Bienvenid@!
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

        <Button
          variant="link"
          style={{ color: "#6db575" }}
          className="mb-3"
          onClick={GotoRecoverPass}
        >
          Olvide mi contraseña
        </Button>

        <div className="d-grid gap-2">
          <CustomButtonPrimary
            label="Ingresar"
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
