import React from "react";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";

interface CustomTitlesProps {
    txt: string;
  }
  
  const CustomTitle: React.FC<CustomTitlesProps> = ({
    txt,

  }) => {
    return (
        <Title>{txt}</Title>
    );
  };
  
  const Title = styled(H1)`
  color: ${themes.dark.text1};
  text-align: start;

`;

  export default CustomTitle;