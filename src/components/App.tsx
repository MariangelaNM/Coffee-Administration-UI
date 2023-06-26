import { FC } from 'react';

import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App: FC = () => {
    return (
        <Router>
            <Sidebar />
            <Switch>
                <Route path="/Inicio" ></Route>
                <Route path="/Mis Fincas" ></Route>
                <Route path="/Mis Recolectores" ></Route>
                <Route path="/Resumen Recolectores" ></Route>
                <Route path="/Resumen Fincas" ></Route>
            </Switch>
        </Router>
    );
};

export default App;


 
