import React, {Suspense} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';

import {LAYOUT, SHAPES} from '@src/constants';

const Top = React.lazy(() =>
  import(/* webpackChunkName: 'Top' */ '@src/components/Top')
);
const Tree = React.lazy(() =>
  import(/* webpackChunkName: 'Tree' */ '@tree/components/Tree')
);
const ClientServer = React.lazy(() =>
  import(
    /* webpackChunkName: 'ClientServer' */ '@clientServer/components/ClientServer'
  )
);

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <BrowserRouter>
          <Suspense fallback="loading...">
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
          </Suspense>
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
