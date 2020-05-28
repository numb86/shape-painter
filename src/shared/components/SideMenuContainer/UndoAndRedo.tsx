import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ActionCreators} from 'redux-undo';
import styled from 'styled-components';

import UndoIcon from '@svg/undo.svg';
import RedoIcon from '@svg/redo.svg';

import {LAYOUT} from '@src/constants';

import {AnyRootState} from './types';

export const UndoAndRedo = () => {
  const dispatch = useDispatch();
  const {past, future} = useSelector(
    // TODO: remove any
    (s: AnyRootState) => (s as any).history
  );

  const hasPast = past.length > 0;
  const hasFuture = future.length > 0;

  const undo = () => {
    dispatch(ActionCreators.undo());
  };
  const redo = () => {
    dispatch(ActionCreators.redo());
  };

  return (
    <UndoAndRedoStyled>
      <Undo type="button" disabled={!hasPast} hasPast={hasPast} onClick={undo}>
        <UndoIcon style={{width: '48px', height: '48px'}} />
        <br />
        undo
      </Undo>
      <Redo
        type="button"
        disabled={!hasFuture}
        hasFuture={hasFuture}
        onClick={redo}
      >
        <RedoIcon style={{width: '48px', height: '48px'}} />
        <br />
        redo
      </Redo>
    </UndoAndRedoStyled>
  );
};

const UndoAndRedoStyled = styled.div`
  display: grid;
  grid-template-columns: ${(LAYOUT.SIDE_MENU_WIDTH - 80) / 2}px 1fr;

  button {
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 16px;

    &:hover {
      background-color: #eee;
    }
  }
`;

const Undo = styled.button<{hasPast: boolean}>`
  opacity: ${(props) => (props.hasPast ? '1.0' : '0.3')};
  cursor: ${(props) => (props.hasPast ? 'pointer' : 'not-allowed')};
`;

const Redo = styled.button<{hasFuture: boolean}>`
  opacity: ${(props) => (props.hasFuture ? '1.0' : '0.3')};
  cursor: ${(props) => (props.hasFuture ? 'pointer' : 'not-allowed')};
`;
