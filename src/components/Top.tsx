import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

import {SHAPES, GA_MEASUREMENT_ID} from '@src/constants';

import TreeIcon from '@svg/tree-icon.svg';

// Uncomment, when implementing ClientServer
export const Top = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = 'Shape Painter';
    if (process.env.NODE_ENV === 'production') {
      gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
        page_title: window.document.title,
      });
    }
  }, []);

  return (
    <Container>
      <Shapes>
        <Tree type="button" onClick={() => navigate(SHAPES.tree.url)}>
          <TreeIcon style={{width: '150px', height: '150px'}} />
          tree
        </Tree>
        {/* <ClientServer
          type="button"
          onClick={() => navigate(SHAPES['client-server'].url)}
        >
          client server
        </ClientServer> */}
      </Shapes>

      <Section>
        <h2>Provider of image material</h2>
        <p>
          The image materials provided by{' '}
          <a
            href="https://icooon-mono.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ICOOON MONO
          </a>{' '}
          and{' '}
          <a
            href="https://favicon.io/emoji-favicons/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Emoji Favicons
          </a>{' '}
          are used.
        </p>
      </Section>

      <Section>
        <h2>Source Code</h2>
        <p>
          The source is published on GitHub.
          <br />
          If you like this content, please Star.
          <br />
          <a
            href="https://github.com/numb86/shape-painter"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/numb86/shape-painter
          </a>
        </p>
      </Section>

      <Section>
        <h2>Privacy</h2>
        <p>
          This website using Google Analytics for analyze access.
          <br />
          Other data collection and analysis is not taken.
        </p>
      </Section>

      <Copyright>Copyright &copy; 2020 numb86</Copyright>
    </Container>
  );
};

// const CONTAINER_WIDTH = 800;
const CONTAINER_WIDTH = 600;

const Container = styled.main`
  grid-column: 1 / 3;
  grid-row: 2;
  width: ${CONTAINER_WIDTH}px;
  margin: 10px auto;
`;

const Shapes = styled.div`
  display: grid;
  /* grid-template-columns: ${CONTAINER_WIDTH / 2}px 1fr; */
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;

  button {
    width: 160px;
    height: 190px;
    margin: auto;
    border: none;
    background-color: rgba(255, 255, 255, 0);
    font-size: 22px;
    color: #000;
    cursor: pointer;

    &:hover {
      color: #3ad2b7;
    }
  }
`;

const Tree = styled.button`
  grid-column: 1;
`;

// const ClientServer = styled.button`
//   grid-column: 2;
// `;

const Section = styled.section`
  a {
    color: rgb(58, 171, 210);
  }
`;

const Copyright = styled.div`
  margin-top: 70px;
  text-align: center;
`;
