import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.scss';

import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Login from './routes/Login';
import UserRegister from './routes/UserRegister';

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
          <UserRegister/>
        </Route>
        <Route path="/Mis Fincas">
          {/* Lógica y componentes para la ruta /Mis Fincas */}
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
      </Switch>
    </BrowserRouter>
  );
};

export default App;