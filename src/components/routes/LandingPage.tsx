import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import { Container, Row, Col } from "react-bootstrap";

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

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  padding: 30px 30px 60px 30px;
  display: grid;

  @media (max-width: 750px) {
    grid-template-columns: auto;
    justify-content: center;
    gap: 40px;
  }

  @media (max-width: 450px) {
    padding: 10px;
  }
`;

const Title = styled(H1)`
  margin-top: 80px;
  font-size: 70px;
  color: ${themes.dark.text1};
  text-align: center;

  @media (max-width: 830px) {
    margin-top: 20px;
  }

  @media (max-width: 450px) {
    font-size: 60px;
  }
`;

export default LandingPage;
