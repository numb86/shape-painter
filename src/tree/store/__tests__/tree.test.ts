import assert from 'power-assert';

import {Tree} from '@tree/tree';
import {
  calculatedSimpleTree,
  calculatedComplexTree,
} from '@tree/__tests__/sampleTree';
import {INITIALIZE_ACTION_TYPE, OVER_WRITE_ACTION_TYPE} from '@src/constants';

import {
  tree,
  editNodeActionCreator,
  addNodeActionCreator,
  removeNodeActionCreator,
} from '../tree';

describe('tree', () => {
  let originalTree: Tree;
  beforeEach(() => {
    originalTree = {
      id: 1,
      text: 'A',
      layout: {
        top: 0,
        left: 0,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [],
    };
  });

  it('Return the previous state as is if an unsupported action is passed', () => {
    assert(
      tree(calculatedSimpleTree, {type: 'foobar'} as any) ===
        calculatedSimpleTree
    );
  });

  describe('editNode', () => {
    it('Change the properties of the specified node', () => {
      const beforeStyle = originalTree.style;
      const afterStyle = {
        textColor: {
          isOverrideByCommonSetting: true,
          value: 'blue',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: 'green',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      };
      const result = tree(
        originalTree,
        editNodeActionCreator(originalTree.id, {style: afterStyle})
      );
      assert.deepStrictEqual(originalTree.style, beforeStyle);
      assert.deepStrictEqual(result.style, afterStyle);
    });

    it('Returns a state with a different reference than the previous state', () => {
      assert(
        tree(
          calculatedSimpleTree,
          editNodeActionCreator(calculatedSimpleTree.id, {text: ''})
        ) !== calculatedSimpleTree
      );
    });
  });

  describe('addNode', () => {
    it('Add a node to the end of children of the specified node', () => {
      let result = tree(originalTree, addNodeActionCreator(originalTree.id));
      result = tree(result, addNodeActionCreator(originalTree.id));
      assert.strictEqual(result.children.length, 2);
      assert.strictEqual(result.children[1].id, originalTree.id + 2);
    });

    it('Returns a state with a different reference than the previous state', () => {
      assert(
        tree(
          calculatedSimpleTree,
          addNodeActionCreator(calculatedSimpleTree.id)
        ) !== calculatedSimpleTree
      );
    });
  });

  describe('removeNode', () => {
    it('Delete specified node', () => {
      let result = tree(originalTree, addNodeActionCreator(originalTree.id));
      assert.strictEqual(result.children.length, 1);
      result = tree(result, removeNodeActionCreator(result.children[0].id));
      assert.strictEqual(result.children.length, 0);
    });

    it('Returns a state with a different reference than the previous state', () => {
      assert(
        tree(
          calculatedComplexTree,
          removeNodeActionCreator(calculatedComplexTree.children[0].id)
        ) !== calculatedComplexTree
      );
    });
  });

  describe('OVER_WRITE', () => {
    it('Overwrite state with passed tree', () => {
      assert(calculatedSimpleTree.text !== originalTree.text);
      const result = tree(calculatedSimpleTree, {
        type: OVER_WRITE_ACTION_TYPE,
        payload: {tree: originalTree},
      });
      assert.strictEqual(result.text, originalTree.text);
    });
  });

  describe('INITIALIZE', () => {
    it('Return the initialState', () => {
      const initialState = tree(undefined, {type: 'foobar'} as any);
      assert.deepStrictEqual(
        tree(calculatedSimpleTree, {type: INITIALIZE_ACTION_TYPE}),
        initialState
      );
    });
  });
});
