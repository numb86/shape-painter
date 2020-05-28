import assert from 'power-assert';

import {INITIALIZE_ACTION_TYPE} from '@src/constants';

import {addNodeSize, nodeSize, NodeSize} from '../nodeSize';

describe('nodeSize', () => {
  let initialState: NodeSize;
  beforeEach(() => {
    initialState = {
      1: {
        width: 100,
        height: 50,
        text: 'root',
      },
    };
  });

  describe('action creator and reducer', () => {
    describe('ADD_NODE_SIZE', () => {
      it('Can add new element', () => {
        const newElement = {
          2: {
            width: 80,
            height: 40,
            text: 'foo',
          },
        };
        const result = nodeSize(initialState, addNodeSize(newElement));
        assert.deepStrictEqual(result, {...initialState, ...newElement});
      });

      it('Can overwrite existing element', () => {
        const newElement = {
          1: {
            width: 80,
            height: 40,
            text: 'foo',
          },
        };
        const result = nodeSize(initialState, addNodeSize(newElement));
        assert.deepStrictEqual(result, {...newElement});
      });
    });
  });

  describe('INITIALIZE', () => {
    it('Return the initialState', () => {
      const definedInitialState = nodeSize(undefined, {foo: 'bar'} as any);

      const changedValue = nodeSize(
        definedInitialState,
        addNodeSize({1: {width: 100, height: 50, text: 'foo'}})
      );

      assert.notDeepStrictEqual(changedValue, definedInitialState);

      assert.deepStrictEqual(
        nodeSize(changedValue, {type: INITIALIZE_ACTION_TYPE}),
        definedInitialState
      );
    });
  });

  it('Return the previous state as is if an unsupported action is passed', () => {
    assert.deepStrictEqual(
      nodeSize(initialState, {foo: 'bar'} as any),
      initialState
    );
  });
});
