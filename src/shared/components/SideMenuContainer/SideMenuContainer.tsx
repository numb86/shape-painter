import React from 'react';
import styled from 'styled-components';

import DownloadIcon from '@svg/download.svg';

import {downloadPngFile} from '@shared/download';

import {SaveAndLoad} from './SaveAndLoad';
import {UndoAndRedo} from './UndoAndRedo';
import {DisplayScale} from './DisplayScale';

export const SideMenuContainer: React.FC = ({children}) => {
  const download = () => {
    downloadPngFile();
  };

  return (
    <Menu>
      <ContentContainer>
        <Download type="button" onClick={download}>
          Download{' '}
          <DownloadIcon
            style={{width: '32px', height: '32px', verticalAlign: 'middle'}}
          />
        </Download>
      </ContentContainer>

      {/* TODO: fix */}
      {window.location.pathname === '/tree' && (
        <ContentContainer>
          <SaveAndLoad />
        </ContentContainer>
      )}

      {/* TODO: fix */}
      {window.location.pathname === '/tree' && (
        <ContentContainer>
          <UndoAndRedo />
        </ContentContainer>
      )}

      <ContentContainer>
        <DisplayScale />
      </ContentContainer>

      <ContentContainer>{children}</ContentContainer>
    </Menu>
  );
};

const BETWEEN_ITEMS_DISTANCE = 28;

const ContentContainer = styled.div`
  margin-bottom: ${BETWEEN_ITEMS_DISTANCE}px;
`;

const Menu = styled.menu`
  margin: 0;
  padding: 40px;
  padding-top: 16px;
  border-right: 1px solid #ccc;
  grid-column: 1;
  grid-row: 2;
`;

const Download = styled.button`
  padding: 4px 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  border: 4px solid rgb(58, 171, 210);
  border-radius: 16px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;
