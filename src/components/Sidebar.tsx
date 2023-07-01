import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import Submenu from "./Submenu";
import "../main.css";

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

  return (
    <IconContext.Provider value={{ color: "#6DB575" }}>
      <div className="Nav">
        <NavIcon to="#" onClick={showSidebar}>
          <AiOutlineMenu />
        </NavIcon>
      </div>
      <SidebarNav sidebar={sidebar}>
        <NavIconClose to="#" onClick={showSidebar}>
          <AiOutlineClose />
        </NavIconClose>

        {SidebarData.map((item, index) => {
          return <Submenu item={item} key={index} />;
        })}
      </SidebarNav>
    </IconContext.Provider>
  );
};

export default Sidebar;
