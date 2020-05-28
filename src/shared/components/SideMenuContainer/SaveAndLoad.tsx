import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import {LAYOUT, OVER_WRITE_ACTION_TYPE} from '@src/constants';
import {save} from '@src/shared/save';
import {load} from '@src/shared/load';

import {AnyRootState} from './types';

export const SaveAndLoad = () => {
  const {present} = useSelector(
    // TODO: remove any
    (s: AnyRootState) => (s as any).history
  );
  const dispatch = useDispatch();

  const onSave = () => {
    save(present, 'tree');
  };

  const onLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    load(e).then((res) => {
      if (!res) return;
      dispatch({type: OVER_WRITE_ACTION_TYPE, payload: res});
    });
  };

  return (
    <SaveAndLoadStyled>
      <button type="button" onClick={onSave}>
        Save
      </button>
      <Label htmlFor="load">
        Load
        <input
          id="load"
          type="file"
          accept="application/json"
          onChange={onLoad}
        />
      </Label>
    </SaveAndLoadStyled>
  );
};

const SaveAndLoadStyled = styled.div`
  display: grid;
  grid-template-columns: ${(LAYOUT.SIDE_MENU_WIDTH - 80) / 2}px 1fr;

  button {
    background-color: rgba(255, 255, 255, 0);
    margin: 0 3px;
    border: 2px solid #fd6dd1;
    border-radius: 4px;
    font-size: 22px;
    font-weight: bold;
    color: #fd6dd1;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
`;

const Label = styled.label`
  margin: 0 3px;
  padding-top: 2px;
  border: 2px solid #fd6dd1;
  border-radius: 4px;
  color: #fd6dd1;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  input {
    display: none;
  }
`;
