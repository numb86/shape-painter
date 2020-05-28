import React from 'react';
import {create, act} from 'react-test-renderer';
import assert from 'power-assert';

import {TREE} from '@src/constants';
import {useNodeSize} from '../useNodeSize';

describe('useNodeSize', () => {
  let nodeSize: {width: number; height: number};

  const Node = () => {
    const [ref, size] = useNodeSize();
    nodeSize = size;
    return <span ref={ref}>sample</span>;
  };

  const mount = (widthValue = 0) => {
    act(() => {
      create(<Node />, {
        createNodeMock: (element) => ({
          ...element,
          offsetWidth: widthValue,
        }),
      });
    });
  };

  describe('nodeSize.width', () => {
    const {MINIMUM_WIDTH, BOTH_SIDE_PADDING} = TREE.NODE;

    it(`if (width of the target node + TREE.NODE.BOTH_SIDE_PADDING <= TREE.NODE.MINIMUM_WIDTH)
          then (TREE.NODE.MINIMUM_WIDTH)`, () => {
      mount(MINIMUM_WIDTH - BOTH_SIDE_PADDING);
      assert.strictEqual(nodeSize.width, MINIMUM_WIDTH);

      mount(MINIMUM_WIDTH - BOTH_SIDE_PADDING - 1);
      assert.strictEqual(nodeSize.width, MINIMUM_WIDTH);
    });

    it(`if (width of the target node + TREE.NODE.BOTH_SIDE_PADDING > TREE.NODE.MINIMUM_WIDTH)
          then (width of the target node + TREE.NODE.BOTH_SIDE_PADDING)`, () => {
      mount(MINIMUM_WIDTH - BOTH_SIDE_PADDING);
      assert.strictEqual(nodeSize.width, MINIMUM_WIDTH);

      const offsetWidth = MINIMUM_WIDTH - BOTH_SIDE_PADDING + 1;
      mount(offsetWidth);
      assert.strictEqual(nodeSize.width, offsetWidth + BOTH_SIDE_PADDING);
    });
  });

  it('nodeSize.height is TREE.NODE.HEIGHT', () => {
    mount();
    assert.strictEqual(nodeSize.height, TREE.NODE.HEIGHT);
  });
});
