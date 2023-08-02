import "bootstrap/dist/css/bootstrap.min.css";
import "../App.scss";

import { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import Login from "./routes/Login";
import UserRegister from "./routes/UserRegister";
import Zonas from "./routes/Zonas";
import ZonasControl from "./routes/ZonasControl";
import MisPeriodos from "./routes/MisPeriodos";
import MisPeriodosControl from "./routes/MisPeriodosControl";
import FarmCreate from './routes/FarmCreate';
import RecolectorCreate from './routes/RecolectorCreate'
import RecoleccionCreate from './routes/RecoleccionCreate';
import LandingPage from "./routes/LandingPage";
import Admin from "./routes/Admin";
import Dashboard from "./routes/Dashboard";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Switch>
        <Route path="/Inicio">
          {/* Lógica y componentes para la ruta /Inicio */}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <UserRegister />
        </Route>
        <Route path="/Mis Fincas">
          {/* Lógica y componentes para la ruta /Mis Fincas */}
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
        <Route path="/MisPeriodos/Edit">
          <MisPeriodosControl />
        </Route>
        <Route path="/MisPeriodos">
          <MisPeriodos />
        </Route>
        <Route path="/Mis Recolectores">
          {/* Lógica y componentes para la ruta /Mis Recolectores */}
        </Route>
        <Route path="/Resumen Recolectores">
          {/* Lógica y componentes para la ruta /Resumen Recolectores */}
        </Route>
        <Route path="/Resumen Fincas">
          {/* Lógica y componentes para la ruta /Resumen Fincas */}
        </Route>
        <Route path="/farms">
          {" "}
          <FarmCreate />
        </Route>
        <Route path="/collector">
          {" "}
          <RecolectorCreate />
        </Route>

        <Route path="/Recoleccion">
          {" "}
          <RecoleccionCreate />
        </Route>
        <Route path="/Mis Recolectores"></Route>
        <Route path="/Resumen Recolectores"></Route>
        <Route path="/Resumen Fincas"></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
