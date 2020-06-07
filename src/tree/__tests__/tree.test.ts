import assert from 'power-assert';

import {TREE} from '@src/constants';

import {
  simpleTree,
  complexTree,
  calculatedSimpleTree,
  calculatedComplexTree,
  sampleTreeBeforeOptimization,
  sampleOptimizedTree,
  edgesOfSampleOptimizedTree,
} from './sampleTree';
import {
  calculateShapeDrawingAreaSize,
  updateLayoutInformationOfTree,
  optimizeTree,
  editContentOfSpecifiedNode,
  generateEdgesOfTree,
  generateNodeArrayFromTree,
  addNode,
  removeNode,
  rotateChildren,
  Tree,
} from '../tree';

describe('tree', () => {
  const STANDARD_NODE_SIZE = {width: 100, height: 50} as const;
  const STANDARD_WIDTH = 740;

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

  describe('calculateShapeDrawingAreaSize', () => {
    const STANDARD_HEIGHT = 490;

    it('When the height of nodeSize increases by n, the height of result increases by ((rowCount - 1) * NODE_COUNT_BETWEEN_ROWS + rowCount) * n', () => {
      // complexTree's row count is 3
      const getExpectedHeight = (heightIncrement: number) => {
        return (
          STANDARD_HEIGHT +
          ((3 - 1) * TREE.NODE_COUNT_BETWEEN_ROWS + 3) * heightIncrement
        );
      };

      let result = calculateShapeDrawingAreaSize({
        tree: complexTree,
        nodeSize: {
          ...STANDARD_NODE_SIZE,
          height: STANDARD_NODE_SIZE.height + 20,
        },
        minSize: {
          width: 0,
          height: 0,
        },
      });
      assert.deepStrictEqual(result, {
        width: STANDARD_WIDTH,
        height: getExpectedHeight(20),
      });

      result = calculateShapeDrawingAreaSize({
        tree: complexTree,
        nodeSize: {
          ...STANDARD_NODE_SIZE,
          height: STANDARD_NODE_SIZE.height + 85,
        },
        minSize: {
          width: 0,
          height: 0,
        },
      });
      assert.deepStrictEqual(result, {
        width: STANDARD_WIDTH,
        height: getExpectedHeight(85),
      });
    });

    it('If the width of nodeSize increases by n, The width of result increases by maxCountOfNodesPlacedInOneRow * n', () => {
      // complexTree's maxCountOfNodesPlacedInOneRow is 6
      const getExpectedWidth = (widthIncrement: number) => {
        return STANDARD_WIDTH + 6 * widthIncrement;
      };

      let result = calculateShapeDrawingAreaSize({
        tree: complexTree,
        nodeSize: {
          ...STANDARD_NODE_SIZE,
          width: STANDARD_NODE_SIZE.width + 20,
        },
        minSize: {
          width: 0,
          height: 0,
        },
      });
      assert.deepStrictEqual(result, {
        width: getExpectedWidth(20),
        height: STANDARD_HEIGHT,
      });

      result = calculateShapeDrawingAreaSize({
        tree: complexTree,
        nodeSize: {
          ...STANDARD_NODE_SIZE,
          width: STANDARD_NODE_SIZE.width + 35,
        },
        minSize: {
          width: 0,
          height: 0,
        },
      });
      assert.deepStrictEqual(result, {
        width: getExpectedWidth(35),
        height: STANDARD_HEIGHT,
      });
    });

    it('If the calculated value is less than min, min is returned', () => {
      let result = calculateShapeDrawingAreaSize({
        tree: complexTree,
        nodeSize: STANDARD_NODE_SIZE,
        minSize: {
          width: STANDARD_WIDTH + 20,
          height: 0,
        },
      });
      assert.deepStrictEqual(result, {
        width: STANDARD_WIDTH + 20,
        height: STANDARD_HEIGHT,
      });

      result = calculateShapeDrawingAreaSize({
        tree: complexTree,
        nodeSize: STANDARD_NODE_SIZE,
        minSize: {
          width: 0,
          height: STANDARD_HEIGHT + 3,
        },
      });
      assert.deepStrictEqual(result, {
        width: STANDARD_WIDTH,
        height: STANDARD_HEIGHT + 3,
      });

      result = calculateShapeDrawingAreaSize({
        tree: complexTree,
        nodeSize: STANDARD_NODE_SIZE,
        minSize: {
          width: STANDARD_WIDTH + 35,
          height: STANDARD_HEIGHT + 30,
        },
      });
      assert.deepStrictEqual(result, {
        width: STANDARD_WIDTH + 35,
        height: STANDARD_HEIGHT + 30,
      });
    });
  });

  describe('updateLayoutInformationOfTree', () => {
    it('Update layout information based on passed information', () => {
      assert.deepStrictEqual(
        updateLayoutInformationOfTree(
          simpleTree,
          STANDARD_NODE_SIZE,
          STANDARD_WIDTH
        ),
        calculatedSimpleTree
      );

      assert.deepStrictEqual(
        updateLayoutInformationOfTree(
          complexTree,
          STANDARD_NODE_SIZE,
          STANDARD_WIDTH
        ),
        calculatedComplexTree
      );
    });

    it('Immutable, so does not change the original tree', () => {
      const updatedTree = updateLayoutInformationOfTree(
        originalTree,
        STANDARD_NODE_SIZE,
        900
      );

      assert.deepStrictEqual(originalTree.layout, {top: 0, left: 0});
      assert.deepStrictEqual(updatedTree.layout, {top: 20, left: 400});

      originalTree.text = 'B';
      updatedTree.text = 'C';

      assert.strictEqual(originalTree.text, 'B');
      assert.strictEqual(updatedTree.text, 'C');
    });
  });

  describe('optimizeTree', () => {
    const nodeSizeObject = {
      1: {
        text: 'Parent',
        width: 72,
        height: 30,
      },
      2: {
        text: 'Child A',
        width: 77,
        height: 30,
      },
      3: {
        text: 'Child B',
        width: 77,
        height: 30,
      },
    };
    it('Optimize left value of each node for clean display', () => {
      const result = optimizeTree(
        sampleTreeBeforeOptimization,
        nodeSizeObject,
        77
      );
      assert.deepStrictEqual(result, sampleOptimizedTree);
    });

    it('Immutable, so does not change the original tree', () => {
      const originalText = sampleTreeBeforeOptimization.text;

      const optimizedTree = optimizeTree(
        sampleTreeBeforeOptimization,
        nodeSizeObject,
        77
      );

      optimizedTree.text = `${originalText}foo`;

      assert.strictEqual(sampleTreeBeforeOptimization.text, originalText);
      assert.strictEqual(optimizedTree.text, `${originalText}foo`);
    });
  });

  describe('editContentOfSpecifiedNode', () => {
    const INDEX_OF_TREE = 1;
    const NEXT_TEXT = 'foobar';
    const NEXT_STYLE = {
      textColor: {
        isOverrideByCommonSetting: true,
        value: 'orange',
      },
      backgroundColor: {
        isOverrideByCommonSetting: true,
        value: 'lime',
      },
      edgeColor: {
        isOverrideByCommonSetting: true,
        value: '#000',
      },
    };

    it('Update the text and style of the node specified by id', () => {
      const tree = complexTree;
      const {id: targetId} = tree.children[INDEX_OF_TREE];

      const result = editContentOfSpecifiedNode(tree, targetId, {
        text: NEXT_TEXT,
        style: NEXT_STYLE,
      });
      const targetNode = result.children[INDEX_OF_TREE];

      assert.strictEqual(targetNode.id, targetId);
      assert.strictEqual(targetNode.text, NEXT_TEXT);
      assert.deepStrictEqual(targetNode.style, NEXT_STYLE);
    });

    it('Immutable, so does not change the original tree', () => {
      const tree = complexTree;
      const {
        id: targetId,
        text: targetText,
        style: targetStyle,
      } = tree.children[INDEX_OF_TREE];

      const result = editContentOfSpecifiedNode(tree, targetId, {
        text: NEXT_TEXT,
        style: NEXT_STYLE,
      });
      const targetNode = result.children[INDEX_OF_TREE];

      // Updated
      assert.strictEqual(targetNode.id, targetId);
      assert.strictEqual(targetNode.text, NEXT_TEXT);
      assert.deepStrictEqual(targetNode.style, NEXT_STYLE);

      // Not updated
      assert.strictEqual(tree.children[INDEX_OF_TREE].id, targetId);
      assert.strictEqual(tree.children[INDEX_OF_TREE].text, targetText);
      assert.deepStrictEqual(tree.children[INDEX_OF_TREE].style, targetStyle);
    });
  });

  describe('generateEdgesOfTree', () => {
    it('Generate edges based on tree layout information and node size', () => {
      assert.deepStrictEqual(
        generateEdgesOfTree(sampleOptimizedTree),
        edgesOfSampleOptimizedTree
      );
    });
  });

  describe('generateNodeArrayFromTree', () => {
    describe('Generate node array based on tree', () => {
      const result = generateNodeArrayFromTree(simpleTree);

      it('The number of property is correct', () => {
        assert.strictEqual(
          Object.keys(result[0]).length,
          Object.keys(simpleTree).length - 1 + 4 // subtract `children`, and add `parentNodeId`, `width`, `height`, `childNodeCount`
        );
      });

      it('Tree contents are correctly reflected', () => {
        const ids = result.map((node) => node.id).sort();
        assert.deepStrictEqual(ids, [1, 2, 3, 4]);
      });
    });

    it('Generated element has not `children` property', () => {
      const result = generateNodeArrayFromTree(simpleTree);

      result.forEach((node) => {
        Object.keys(node).forEach((key) => {
          assert(key !== 'children');
        });
      });
    });

    it('Immutable, so does not change the original tree', () => {
      const node = {
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
        parentNodeId: null,
        width: 100,
        height: 30,
        childNodeCount: 0,
      };
      const tree = {
        ...node,
        layout: {
          ...node.layout,
        },
        style: {
          ...node.style,
        },
        children: [],
      };
      const nodeArray = generateNodeArrayFromTree(tree);

      assert.deepStrictEqual(nodeArray[0], node);

      node.layout.top = 10;
      nodeArray[0].layout.top = 20;

      assert.strictEqual(node.layout.top, 10);
      assert.strictEqual(nodeArray[0].layout.top, 20);
    });
  });

  describe('addNode', () => {
    const newNode = {
      text: 'new comer',
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

    it('New nodes can be added as children of the specified node', () => {
      const result = addNode(complexTree, newNode, 3);
      assert.strictEqual(complexTree.children[1].children.length, 3);
      assert.strictEqual(result.children[1].children.length, 4);
      const addedNode = result.children[1].children[3];
      const addedNodeId = result.children[1].children[3].id;
      assert.deepStrictEqual(addedNode, {id: addedNodeId, ...newNode});
    });

    it('ID are automatically assigned', () => {
      originalTree.id = 4;
      const result = addNode(originalTree, newNode, 4);
      assert.strictEqual(result.children[0].id, 5);
    });

    it('An error occurs if a non-existent node is specified as a parent', () => {
      let isError = false;

      try {
        addNode(complexTree, newNode, 100);
      } catch {
        isError = true;
      }

      assert(isError);
    });
  });

  describe('removeNode', () => {
    it('Remove node specified by id', () => {
      let result = removeNode(simpleTree, 4);
      assert.strictEqual(simpleTree.children[0].children.length, 1);
      assert.strictEqual(result.children[0].children.length, 0);

      result = removeNode(complexTree, 2);
      assert.strictEqual(complexTree.children[0].children[0].text, 'D');
      assert.strictEqual(result.children[0].children[0].text, 'F');
    });

    it('An error occurs if specified node is root', () => {
      let isError = false;

      try {
        removeNode(complexTree, complexTree.id);
      } catch {
        isError = true;
      }

      assert(isError);
    });

    it('An error occurs if a non-existent node is specified as a target', () => {
      let isError = false;

      try {
        removeNode(complexTree, 99);
      } catch {
        isError = true;
      }

      assert(isError);
    });
  });

  describe('rotateChildren', () => {
    const layout = {
      top: 0,
      left: 0,
    };
    const styleValue = {
      isOverrideByCommonSetting: true,
      value: '#fff',
    };
    const style = {
      textColor: styleValue,
      backgroundColor: styleValue,
      edgeColor: styleValue,
    };

    let tree: Tree;
    beforeEach(() => {
      tree = {
        id: 1,
        text: 'A',
        layout,
        style,
        children: [
          {
            id: 2,
            text: 'B',
            layout,
            style,
            children: [
              {
                id: 4,
                text: 'Child of B',
                layout,
                style,
                children: [],
              },
            ],
          },
          {
            id: 3,
            text: 'C',
            layout,
            style,
            children: [],
          },
        ],
      };
    });

    it('The child of the node with the specified ID rotate', () => {
      assert.strictEqual(tree.children[0].text, 'B');

      const result = rotateChildren(tree, tree.id);
      assert.strictEqual(result.children[0].text, 'C');
      assert.strictEqual(result.children[0].children.length, 0);
      assert.strictEqual(result.children[1].children.length, 1);
      assert.strictEqual(result.children[1].children[0].text, 'Child of B');
    });

    it('Immutable, so does not change the original tree', () => {
      const result = rotateChildren(tree, tree.id);
      assert.strictEqual(tree.children[0].text, 'B');
      assert.strictEqual(result.children[0].text, 'C');
      assert.strictEqual(tree.children[0].children.length, 1);
      assert.strictEqual(result.children[0].children.length, 0);
    });

    it('An error occurs if a non-existent node is specified as a target', () => {
      let isError = false;

      try {
        rotateChildren(tree, 99);
      } catch {
        isError = true;
      }

      assert(isError);
    });
  });
});
