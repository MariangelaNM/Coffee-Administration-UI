import React from "react";
import ReactDOM from 'react-dom/client';
import "./main.css";
import App from "./components/App.tsx";
import "./i18n";
//import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
//TODO Faltaria hacer el AuthProvider
