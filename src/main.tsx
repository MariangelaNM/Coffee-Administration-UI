import React from "react";
import ReactDOM from 'react-dom/client';
import "./main.css";
import App from "./components/App.tsx";
import "./i18n";
//import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from "react-helmet-async";
import { UserProvider } from '../src/components/UserContext.tsx'; // Importa UserProvider

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider> {/* Envuelve tu aplicación con UserProvider */}

      <HelmetProvider>
        <App />
      </HelmetProvider>

    </UserProvider>
  </React.StrictMode>
);
//TODO Faltaria hacer el AuthProvider
