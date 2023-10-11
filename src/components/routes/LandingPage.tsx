import styled from "styled-components";


const LandingPage = () => {
  return (
<Wrapper></Wrapper>
  );
};
/*
const { t } = useTranslation();
  <Wrapper>
      <ContentWrapper>
        <Title>{t("landing.title")}</Title>
      </ContentWrapper>
    </Wrapper>
*/
const Wrapper = styled.div`
  overflow: hidden;
  height: 1200px;
  @media (min-width: 2500px) {
    padding-bottom: 100px;
  }
`;

export default LandingPage;
