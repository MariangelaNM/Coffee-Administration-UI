import { FC, useEffect, useState } from "react";
import { Link,useLocation  } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import Submenu from "./Submenu";
import "../main.css";
import logoCompleto_blanco from '../assets/logoCompleto_blanco.png';
import logoCompleto from '../assets/logoCompleto.png';

const SidebarNav = styled.div<{ sidebar: boolean }>`
  width: 250px;
  height: 100vh;
  background-color: #7a501f;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
`;

const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  font-size: 2rem;
  margin-left: 2rem;
`;
const NavIconClose = styled(Link)`
  display: flex;
  height: 5rem;
  font-size: 2rem;
  margin-left: 2rem;
  float: right;
  margin: 10px;
`;
const Sidebar: FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  let path = window.location.pathname;
  const location = useLocation(); // Obtiene la ubicación actual desde React Router

  useEffect(() => {
    path = window.location.pathname;
  }, [location]); // Se ejecutará el efecto cuando la ubicación (ruta) cambie

  return (
    <IconContext.Provider value={{ color: "#6DB575" }}>
      <div className="Nav" style={{ width: "100%" }}>
        <NavIcon to="#" onClick={showSidebar} style={{ width: "100%" }}>
          {path != '/signup' && path != '/login' && path != '/' && 
            <AiOutlineMenu />}
          <img src={logoCompleto} className="icon-navbar" />
        </NavIcon>
      </div>
      {path != '/signup' && path != '/login' && path != '/'  &&
        <SidebarNav sidebar={sidebar}>
          <img src={logoCompleto_blanco} className="icon-sidebar" />

          <NavIconClose to="#" onClick={showSidebar}>
            <AiOutlineClose />
          </NavIconClose>

          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
          })}

        </SidebarNav>}

    </IconContext.Provider>
  );
};

export default Sidebar;
