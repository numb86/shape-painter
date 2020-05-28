import React, {useRef, useEffect, useState} from 'react';
import {TREE} from '@src/constants';

export const useNodeSize = () => {
  const ref: React.MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const [nodeSize, setNodeSize] = useState({width: 0, height: 0});
  const [mountedText, setMountedText] = useState('');

  useEffect(() => {
    if (ref.current) {
      const targetNodeWidth =
        ref.current.offsetWidth + TREE.NODE.BOTH_SIDE_PADDING;
      const width =
        targetNodeWidth > TREE.NODE.MINIMUM_WIDTH
          ? targetNodeWidth
          : TREE.NODE.MINIMUM_WIDTH;
      setNodeSize({
        width,
        height: TREE.NODE.HEIGHT,
      });
    }
  }, [mountedText]);

  return [ref, nodeSize, setMountedText] as const;
};
