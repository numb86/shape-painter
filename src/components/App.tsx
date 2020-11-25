import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';

import {Top} from '@src/components/Top';
import {Tree} from '@tree/components/Tree';
import {ClientServer} from '@clientServer/components/ClientServer';

import {LAYOUT, SHAPES} from '@src/constants';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
          <Header>
            <Link to="/">Shape Painter</Link>
          </Header>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path={SHAPES.tree.url} element={<Tree />} />
            <Route
              path={SHAPES['client-server'].url}
              element={<ClientServer />}
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    user-select: none;
    font-family: Verdana, Geneva, Tahoma, sans-serif
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: ${LAYOUT.SIDE_MENU_WIDTH}px 1fr;
  grid-template-rows: ${LAYOUT.HEADER_HEIGHT}px 1fr;
`;

const Header = styled.header`
  grid-column: 1 / 3;
  grid-row: 1;
  color: #000;
  font-size: 18px;
  padding-top: 8px;
  padding-left: 16px;
  border-bottom: 1px solid #ccc;
  a {
    color: #000;
    text-decoration: none;
  }
`;
