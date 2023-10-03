
import { Container, Navbar } from "react-bootstrap";

export const home = {
  title: "nav.home",
  link: "/",
};

export const menuData = [
  {
    title: "nav.dashboard",
    link: "/dashboard",
  },
  {
    title: "nav.admin",
    link: "/admin",
  },
  {
    title: "nav.registro",
    link: "/signup",
  },
];

const Header = () => {
  return (
    <Container>
      <Navbar >
        <Container>
          <Navbar.Brand href="#">Coffee Administration</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;

/*

 const { t } = useTranslation();

    <Wrapper>
      <Link to={home.link}>
        <LinkButton>{t(home.title)}</LinkButton>
      </Link>
      <MenuWrapper count={menuData.length}>
        {menuData.map((item, index) => (
          <Link to={item.link} key={index}>
            <LinkButton>{t(item.title)}</LinkButton>
          </Link>
        ))}
      </MenuWrapper>
    </Wrapper>

*/


// const Logo = styled.img`
//   height: 30px;
// `;
