import React from 'react';
import styled from 'styled-components';

type Props = {
  mainElementRef?: React.MutableRefObject<HTMLElement | null>;
};

export const Main: React.FC<Props> = ({children, mainElementRef}) => (
  <MainStyled ref={mainElementRef}>{children}</MainStyled>
);

const MainStyled = styled.main`
  background-color: #fff;
  grid-column: 2;
  grid-row: 2;
  overflow: scroll;
`;
