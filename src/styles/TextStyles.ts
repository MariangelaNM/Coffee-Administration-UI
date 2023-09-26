import styled from "styled-components";

export const H1 = styled.h1`

  font-size: 50px;
  line-height:50px;
  @media (max-width: 450px) {
    font-size: 36px;  
    line-height:40px;
  }
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const H2 = styled.h2`
  font-weight: bold;
  font-size: 32px;
  @media (max-width: 450px) {
    font-size: 24px;
  }
`;

export const H3 = styled.h3`
  font-weight: bold;
  font-size: 27px;
  @media (max-width: 450px) {
    font-size: 24px;
  }
`;

export const H4 = styled.h4`
  font-weight: bold;
  font-size: 20px;
  @media (max-width: 450px) {
    font-size: 18px;
  }
`;
export const BodyIntro = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
`;

export const BodyMain = styled.p`
  font-weight: normal;
  font-size: 20px;
  line-height: 140%;
`;

export const MediumText = styled.p`
  font-weight: normal;
  font-size: 17px;
  line-height: 130%;
  @media (max-width: 450px) {
    font-size: 15px;
    line-height: 100%;
  }
`;

export const DescriptionCard = styled.p`
  font-weight: normal;
  font-size: 17px;
  line-height: 130%;
  @media (max-width: 450px) {
    font-size: 14px;
    line-height: 100%;
  }
`;

export const Caption = styled.p`
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
`;

export const Caption2 = styled.p`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-transform: uppercase;
`;

export const SmallText = styled.p`
  font-weight: normal;
  font-size: 13px;
  line-height: 130%;
`;

export const SmallText2 = styled.p`
  font-weight: 600;
  font-size: 13px;
  line-height: 130%;
  text-transform: uppercase;
`;
