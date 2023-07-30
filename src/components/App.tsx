import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.scss';


import { FC } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import FarmCreate from './routes/FarmCreate';
import RecolectorCreate from './routes/RecolectorCreate';

import UserRegister from "./routes/UserRegister";
import RecoleccionCreate from './routes/RecoleccionCreate';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.scss'

import Login from './routes/Login';

const App: FC = () => {
    return (
        <Router>
            <Sidebar />
            <Switch>
                <Route path="/Inicio"  ></Route>
                <Route path="/login"  ><Login /> </Route>
                <Route path="/signup"> <UserRegister /> </Route>  
                <Route path="/farms" > <FarmCreate/></Route>
                <Route path="/collector" > <RecolectorCreate/></Route>
                <Route path="/Recoleccion" > <RecoleccionCreate/></Route>

                <Route path="/Mis Recolectores" ></Route>
                <Route path="/Resumen Recolectores" ></Route>
                <Route path="/Resumen Fincas" ></Route>
            </Switch>
        </Router>
    );

};

export default App;