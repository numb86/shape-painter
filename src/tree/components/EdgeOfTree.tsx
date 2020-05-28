import React from 'react';
import styled from 'styled-components';

import {Edge} from '@tree/tree';
import {TREE} from '@src/constants';

type Props = Omit<Edge, 'id' | 'color'> & {color: string};

export const EdgeOfTree = (props: Props) => <EdgeStyledComponent {...props} />;

const EdgeStyledComponent = styled.div<Props>((props: Props) => {
  const {top, left, width, positionOfParent, color} = props;

  const linerGradientMap = new Map([
    ['center', 'right'],
    ['right', 'left top'],
    ['left', 'right top'],
  ]);

  const linerGradient = linerGradientMap.get(positionOfParent);

  let startEdgePoint = 49.2;
  let endEdgePoint = 50.8;

  if (linerGradient !== 'right') {
    startEdgePoint = 49;
    endEdgePoint = 51;
  }

  if (width < 5) {
    startEdgePoint = 40;
    endEdgePoint = 60;
  }

  let backgroundColor = '';
  if (width < 3) {
    backgroundColor = color;
  }

  return `
position: absolute;
top: ${top}px;
left: ${left}px;
width: ${width}px;
height: ${
    TREE.NODE.HEIGHT * TREE.NODE_COUNT_BETWEEN_ROWS + TREE.EDGE.LENGTH_TO_ADD
  }px;
background-image linear-gradient(to ${linerGradient}, rgba(255,255,255,0) ${startEdgePoint}%, ${color} ${
    startEdgePoint + 1
  }%, ${color} ${endEdgePoint - 1}%, rgba(255,255,255,0) ${endEdgePoint}%);
background-color: ${backgroundColor}
`;
});
