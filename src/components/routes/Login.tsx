
import { ChangeEvent, FormEvent, useState } from "react";

import { Container, Form } from "react-bootstrap";

import CustomTitles from "../widgets/CustomTitles";
import CustomInput from "../widgets/CustomInputWidget/CustomInput";
import CustomPasswordInput from "../widgets/CustomInputWidget/CustomPasswordInput";
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary";
import CustomButtonSecondary from "../widgets/CustomButtonSecondaryWidget/CustomButtonSecondary";
//import CustomAlert from "../widgets/CustomAlert";

const Login = () => {
  //const [errorMsg, setErrorMsg] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const readyToSubmit = mail !== "" && password !== "";
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

  function onChangeAnyInput() {
    //setErrorMsg("");
  }

  function onChangeMail(e: ChangeEvent<HTMLInputElement>) {
    setMail(e.target.value);
    onChangeAnyInput();
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    onChangeAnyInput();
  }

  // function displayErrorMessage() {
  //  if (error) {
  //     return <CustomAlert success={false} label={error.message} />;
  //    }
  //    return null;
  // }
  // function displaySuccessMessage() {
  //   if (status === "success") {
  //     return <CustomAlert success={true} label="Cuenta creada exitosamente" />;
  //   }
  //   return null;
  // }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Ingresar"} />
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
