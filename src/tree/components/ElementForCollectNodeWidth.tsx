import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import {useNodeSize} from '@tree/components/customHooks/useNodeSize';
import {addNodeSize} from '@tree/store/nodeSize';

type Props = {
  id: number;
  text: string;
};

export const ElementForCollectNodeWidth = ({id, text}: Props) => {
  const [elementRef, nodeSize] = useNodeSize();
  const dispatch = useDispatch();

  useEffect(() => {
    const {width, height} = nodeSize;
    // It does not make sense to record information when size is 0
    // Avoid store updates, because re-rendering will occur if you update store
    if (width !== 0 && height !== 0) {
      dispatch(addNodeSize({[id]: {text, width, height}}));
    }
  }, [id, text, nodeSize, dispatch]);

  return <SpanStyledComponent ref={elementRef}>{text}</SpanStyledComponent>;
};

const SpanStyledComponent = styled.span`
  position: fixed;
  visibility: hidden;
`;
