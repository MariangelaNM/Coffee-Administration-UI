import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import createApiClient from "../../api/api-client-factory";
import { Register } from "../../models/Register";
import { useCreateUser } from "../../hooks/useCreateUser";
//import { useNavigate} from 'react-router';

const UserRegister = () => {
  const emptyRegisterInput: Partial<Register> = {
    username: "",
    lastName: "",
    mail: "",
    password: "",
    confirmPass: "",
  };
  const [registerInput, setRegisterInput] =
    useState<Partial<Register>>(emptyRegisterInput);
  
  //const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [passwordValidate, setPasswordValidate] = useState(false);
  const [confirmPassValidate, setConfirmPassValidate] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const apiClient = useMemo(() => createApiClient(), []);
  const { create, status, error } = useCreateUser(apiClient.postUser);

  useEffect(() => {
    if (status === "success") {
      console.log("Creacion exitosa");
      //navigate('/dashboard');
    } else {
      console.log("Creacion NO exitosa");
    }
    return () => {};
  }, [status]);

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
    if (errorMsg) {
      return <div>Error: {errorMsg}</div>;
    }
    return null;
  }

  const postData = async () => {
    // debugger;
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        Correo: registerInput.mail,
        Contrasena: registerInput.password,
        Nombres: registerInput.username,
        Apellidos: registerInput.lastName,
        Role: 1,
      });

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: myHeaders,
        body: raw,
      });
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function postUser() {
    if (readyToSubmit) {
      console.log("TODO OK");
      postData();
    }
    console.log("ERROR");
  }



  return (
    <Container className="col-lg-6 col-xxl-4 my-5 mx-auto">
      <Title>{"Crea una nueva cuenta"}</Title>
      {displayErrorMessage()} {/* Mostrar mensaje de error */}
      <Form noValidate validated={readyToSubmit}>
        <Form.Group className="mb-3 sm-1" controlId="formName">
          <Form.Label className="labelForm">Nombre</Form.Label>
          <Form.Control
            className="inputForm"
            type="text"
            placeholder="Nombre"
            value={registerInput.username}
            onChange={(e) => onChange(e, "username")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacio{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 sm-1" controlId="formLastName">
          <Form.Label className="labelForm">Apellidos</Form.Label>
          <Form.Control
            className="inputForm"
            type="text"
            placeholder="Apellidos"
            value={registerInput.lastName}
            onChange={(e) => onChange(e, "lastName")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo no puede estar vacio{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="labelForm">Correo</Form.Label>
          <Form.Control
            className="inputForm"
            type="email"
            placeholder="correo@domain.com"
            value={registerInput.mail}
            onChange={(e) => onChange(e, "mail")}
            required
          />
          <Form.Control.Feedback type="invalid">
            El campo debe ser un correo valido{" "}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="labelForm">Contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              className="inputForm"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={registerInput.password}
              onChange={(e) => onChange(e, "password")}
              required
              isInvalid={!passwordValidate && registerInput.password != ""}
            />
            <InputGroup.Text
              className="inputGroupico"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              La contraseña debe contener al menos 8 caracteres, 1 mayúscula y 1
              número
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="labelForm">Confirma tu contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              className="inputForm"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Contraseña"
              value={registerInput.confirmPass}
              onChange={(e) => onChange(e, "confirmPass")}
              required
              isInvalid={
                !confirmPassValidate && registerInput.confirmPass != ""
              }
            />
            <InputGroup.Text
              className="inputGroupico"
              onClick={toggleConfirmPassVisibility}
            >
              {showConfirmPass ? <FiEyeOff /> : <FiEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              Las contraseñas no coinciden
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button
            variant="primary"
            className="custombtn-primary"
            onClick={() => postUser()}
            disabled={status === "loading"||!readyToSubmit}
          >
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

const Title = styled(H1)`
  color: ${themes.dark.text1};
  text-align: start;
`;

export default UserRegister;
