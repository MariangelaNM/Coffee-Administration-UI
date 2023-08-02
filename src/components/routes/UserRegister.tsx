import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { Button, Container, Form } from "react-bootstrap";

import createApiClient from "../../api/api-client-factory";
import { Register } from "../../models/Register";
import { useCreateUser } from "../../hooks/useCreateUser";

import CustomTitles from "../widgets/CustomTitles";
import CustomInput from "../widgets/CustomInputWidget/CustomInput"; 
import CustomPasswordInput from "../widgets/CustomInputWidget/CustomPasswordInput"; 
import CustomButtonPrimary from "../widgets/CustomBtnPrimaryWidget/CustomBtnPrimary"; 
import CustomButtonSecondary from "../widgets/CustomButtonSecondaryWidget/CustomButtonSecondary"; 
import CustomAlert from "../widgets/CustomAlert";

//import { useNavigate } from 'react-router';
import { useHistory } from "react-router-dom";
import { User } from "../../models/User";

const UserRegister =  () => {
  const emptyRegisterInput: Partial<Register> = {
    username: "",
    lastName: "",
    mail: "",
    password: "",
    confirmPass: "",
  };

  const [registerInput, setRegisterInput] =
    useState<Partial<Register>>(emptyRegisterInput);
  const history = useHistory();
  
  const [passwordValidate, setPasswordValidate] = useState(false);
  const [confirmPassValidate, setConfirmPassValidate] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const apiClient = useMemo(() => createApiClient(), []);
  const { create, status, error } = useCreateUser(apiClient.postUser);

  useEffect(() => {
    if (status === "success") {
      console.log("Creacion exitosa");
      onReset();
      //TODO navega a la pantalla de para hacer loging o se hace loging automatico para ir a pantalla principal
      history.push('/login')
      
    } else {
      //console.log(error);
    }
    return () => {};
  }, [status]);
  //TODO   }, [status,navigate]);

  function onChange(
    e: ChangeEvent<HTMLInputElement>,
    attribute: keyof Register
  ) {
    setRegisterInput({ ...registerInput, [attribute]: e.target.value });
    if (attribute == "password") {
      const safePass =
        (e.target.value as string).length >= 8 &&
        /[a-z]/.test(e.target.value as string) &&
        /[A-Z]/.test(e.target.value as string) &&
        /[0-9]/.test(e.target.value as string);
      console.log("cambiaste pass = " + safePass);
      setPasswordValidate(safePass);
      if (registerInput.confirmPass != "") {
        const samePass = e.target.value == registerInput.password;
        setConfirmPassValidate(samePass);
      }
    }
    if (attribute == "confirmPass") {
      const samePass = e.target.value == registerInput.password;
      console.log("same pass = " + samePass);
      setConfirmPassValidate(samePass);
    }
  }

  function onReset() {
    setRegisterInput(emptyRegisterInput);
  }

  const readyToSubmit =
    registerInput.username !== "" &&
    registerInput.lastName !== "" &&
    registerInput.mail !== "" &&
    registerInput.password !== "" &&
    registerInput.confirmPass !== "" &&
    passwordValidate &&
    confirmPassValidate;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassVisibility = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  function displayErrorMessage() {
    if (error) {
      return <CustomAlert success={false} label={error.message} />;
    }
    return null;
  }
  function displaySuccessMessage() {
    if (status === "success") {
      return <CustomAlert success={true} label="Cuenta creada exitosamente" />;
    }
    return null;
  }
  async function postUser() {
    const errorMessage = !readyToSubmit
      ? "Uno o más datos son incorrectos"
      : undefined;
    const newRegister = {
      Correo: registerInput.mail,
      Contrasena: registerInput.password,
      Nombres: registerInput.username,
      Apellidos: registerInput.lastName,
      Role: 1,
    };
    console.log(newRegister);
    create(newRegister as User, errorMessage);
  }

  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <CustomTitles txt={"Crea una nueva cuenta"} />
      {displayErrorMessage()}
      {displaySuccessMessage()}
      <Form noValidate validated={readyToSubmit}>
        <CustomInput
          label="Nombre"
          placeholder="Nombre"
          typeForm="text"
          value={registerInput.username as string}
          onChange={(e) => onChange(e, "username")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        <CustomInput
          label="Apellidos"
          placeholder="Apellidos"
          typeForm="text"
          value={registerInput.lastName as string}
          onChange={(e) => onChange(e, "lastName")}
          required
          onInvalidText={"El campo no puede estar vacio"}
        />
        <CustomInput
          label="Correo"
          placeholder="correo@domain.com"
          typeForm="email"
          value={registerInput.mail as string}
          onChange={(e) => onChange(e, "mail")}
          required
          onInvalidText={"El campo debe ser un correo valido"}
        />
        <CustomPasswordInput
          label="Contraseña"
          placeholder="Contraseña"
          value={registerInput.password as string}
          onChange={(e) => onChange(e, "password")}
          required
          confirmPasswordValid={passwordValidate}
          togglePasswordVisibility={togglePasswordVisibility}
          showPassword={showPassword}
          onInvalidText={
            "La contraseña debe contener al menos 8 caracteres, 1 mayúscula y 1 número"
          }
        />
        <CustomPasswordInput
          label="Confirma tu contraseña"
          placeholder="Confirma tu contraseña"
          value={registerInput.confirmPass as string}
          onChange={(e) => onChange(e, "confirmPass")}
          required
          confirmPasswordValid={confirmPassValidate}
          togglePasswordVisibility={toggleConfirmPassVisibility}
          showPassword={showConfirmPass}
          onInvalidText={"Las contraseñas no coinciden"}
        />

        <div className="d-grid gap-2">


          <Button variant="primary" className="custombtn-primary no-active-style" onClick={()=>postUser()}>

            Registrar
          </Button>

          <Button variant="primary" className="custombtn-secondary">
            Cancelar
          </Button>

        </div>
      </Form>
    </Container>
  );
};

export default UserRegister;
