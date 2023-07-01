import { FC } from 'react';
import  Login from './routes/Login'
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from "./routes/LandingPage";
import Dashboard from "./routes/Dashboard";
import Admin from "./routes/Admin";
import UserRegister from "./routes/UserRegister";


import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.scss'
const App: FC = () => {
    return (
        <Router>
            <Sidebar />
            <Switch>
                <Route path="/Inicio"  ></Route>
                <Route path="/login"  ><Login /> </Route>
                <Route path="/signup"> <UserRegister /> </Route>  
                <Route path="/Mis Fincas" ></Route>
                <Route path="/Mis Recolectores" ></Route>
                <Route path="/Resumen Recolectores" ></Route>
                <Route path="/Resumen Fincas" ></Route>
            </Switch>
        </Router>
    );
};

export default App;


 
