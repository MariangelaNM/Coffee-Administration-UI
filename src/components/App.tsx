import "bootstrap/dist/css/bootstrap.min.css";
import "../App.scss";

import { FC, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import Login from "./routes/Login";
import UserRegister from "./routes/UserRegister";
import Zonas from "./routes/Zonas";
import ZonasControl from "./routes/ZonasControl";
import MisPeriodos from "./routes/MisPeriodos";
import MisPeriodosControl from "./routes/MisPeriodosControl";
import Farms from "./routes/Farms";
import FarmCreate from "./routes/FarmCreate";
import RecolectorCreate from "./routes/RecolectorCreate";
import RecoleccionCreate from "./routes/RecoleccionCreate";
import Recolector from "./routes/Recolector";
import Admin from "./routes/Admin";
import IndexPage from "./routes/IndexPage";
import RecoleccionPeriodo from "./routes/RecoleccionPeriodo";
import PeriodoPago from "./routes/PeriodoPago";
import RecolectorPago from "./routes/RecolectorPago";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Switch>
        <Route path="/Inicio">
          <Admin />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <UserRegister />
        </Route>
        <Route path="/Fincas/Create">
          {" "}
          <FarmCreate />
        </Route>
        <Route path="/Fincas/Edit">
          <FarmCreate />
        </Route>
        <Route path="/Fincas">
          <Farms />
        </Route>
        <Route path="/Zonas/Create">
          <ZonasControl />
        </Route>
        <Route path="/Zonas/Edit">
          <ZonasControl />
        </Route>
        <Route path="/Zonas">
          <Zonas />
        </Route>
        <Route path="/MisPeriodos/Create">
          <MisPeriodosControl />
        </Route>
        <Route path="/MisPeriodos/Edit"></Route>
        <Route path="/MisPeriodos">
          <MisPeriodos />
        </Route>
        <Route path="/RecoleccionPeriodo">
          <RecoleccionPeriodo />
        </Route>
        <Route path="/Recoleccion">
          <RecoleccionCreate />
        </Route>
        <Route path="/PeriodoPago">
          <PeriodoPago />
        </Route>
        <Route path="/RecolectorPago">
          <RecolectorPago />
        </Route>
        <Route path="/Mis Recolectores/Create">
          <RecolectorCreate />
        </Route>
        <Route path="/Mis Recolectores/Edit">
          <RecolectorCreate />
        </Route>
        <Route path="/Mis Recolectores">
          <Recolector />
        </Route>
        <Route path="/Resumen Recolectores">
          {/* Lógica y componentes para la ruta /Resumen Recolectores */}
        </Route>

        <Route path="/Resumen Fincas">
          {/* Lógica y componentes para la ruta /Resumen Fincas */}
        </Route>
        <Route path="/collector">
          {" "}
          <RecolectorCreate />
        </Route>
        <Route path="/Recoleccion">
          {" "}
          <RecoleccionCreate />
        </Route>
        <Route path="/">
          <IndexPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
