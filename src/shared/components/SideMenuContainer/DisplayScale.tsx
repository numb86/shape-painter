import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import ScaleUpIcon from '@svg/scale-up.svg';
import ScaleDownIcon from '@svg/scale-down.svg';

import {setAbsoluteValue} from '@shared/store/displayScale';
import {MAX_DISPLAY_SCALE, MIN_DISPLAY_SCALE} from '@src/constants';

import {AnyRootState} from './types';

export const DisplayScale = () => {
  const displayScale = useSelector((s: AnyRootState) => s.displayScale);
  const dispatch = useDispatch();

  const scaleUp = () => {
    if (displayScale >= MAX_DISPLAY_SCALE) return;
    dispatch(setAbsoluteValue((displayScale * 10 + 1) / 10));
  };
  const scaleDown = () => {
    if (displayScale <= MIN_DISPLAY_SCALE) return;
    dispatch(setAbsoluteValue((displayScale * 10 - 1) / 10));
  };
  const oneMagnification = () => {
    dispatch(setAbsoluteValue(1));
  };

  return (
    <DisplayScaleStyled>
      <ScaleUp
        type="button"
        onClick={scaleUp}
        disabled={displayScale >= MAX_DISPLAY_SCALE}
        displayScale={displayScale}
      >
        <ScaleUpIcon style={{width: '32px', height: '32px'}} />
      </ScaleUp>
      <ScaleDown
        type="button"
        onClick={scaleDown}
        disabled={displayScale <= MIN_DISPLAY_SCALE}
        displayScale={displayScale}
      >
        <ScaleDownIcon style={{width: '32px', height: '32px'}} />
      </ScaleDown>
      <OneMagnification type="button" onClick={oneMagnification}>
        1.0
      </OneMagnification>
      <br />
      Display Scale <strong>{displayScale === 1 ? '1.0' : displayScale}</strong>
    </DisplayScaleStyled>
  );
};

const DisplayScaleStyled = styled.div`
  button {
    background-color: rgba(255, 255, 255, 0);
    &:hover {
      background-color: #eee;
    }
  }
`;

const ScaleUp = styled.button<{displayScale: number}>`
  vertical-align: middle;
  border: none;
  cursor: ${(props) =>
    props.displayScale >= MAX_DISPLAY_SCALE ? 'not-allowed' : 'pointer'};
  opacity: ${(props) =>
    props.displayScale >= MAX_DISPLAY_SCALE ? '0.3' : '1'};
`;

const ScaleDown = styled.button<{displayScale: number}>`
  vertical-align: middle;
  border: none;
  cursor: ${(props) =>
    props.displayScale <= MIN_DISPLAY_SCALE ? 'not-allowed' : 'pointer'};
  opacity: ${(props) =>
    props.displayScale <= MIN_DISPLAY_SCALE ? '0.3' : '1'};
`;

const OneMagnification = styled.button`
  font-size: 18px;
  font-weight: bold;
  color: rgb(58, 210, 183);
  vertical-align: middle;
  margin-top: -2px;
  margin-left: 10px;
  border: 3px solid rgb(58, 210, 183);
  border-radius: 4px;
  cursor: pointer;
`;
