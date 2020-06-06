import {TREE} from '@src/constants';
import {NodeSize as NodeSizeObject} from '@tree/store/nodeSize';

const PADDINGS = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
} as const;
const SPACING_BETWEEN_NODES = 20 as const;

type StyleProperty = {
  isOverrideByCommonSetting: boolean;
  value: string;
};

export type UserEditableStyleProperty = {
  textColor: StyleProperty;
  backgroundColor: StyleProperty;
  edgeColor: StyleProperty;
};

export type UserEditablePropertyOfTree = {
  text: string;
  style: UserEditableStyleProperty;
};

export type Tree = {
  id: number;
  layout: {
    top: number;
    left: number;
  };
  children: Tree[];
} & UserEditablePropertyOfTree;

type OccupiedWidthPosition = {
  begin: number;
  end: number;
};

export type NodeArrayElement = Omit<Tree, 'children'> & {
  parentNodeId: number | null;
  width: number;
  height: number;
  childNodeCount: number;
};

export type NodeArray = NodeArrayElement[];

type TemporaryTreeForLayoutCalculation = Tree & {
  occupiedWidthPosition: OccupiedWidthPosition;
};

type OptimizedTree = Omit<Tree, 'children'> & {
  width: number;
  height: number;
  children: OptimizedTree[];
};

type SomeTree = Tree | TemporaryTreeForLayoutCalculation | OptimizedTree;

const isTemporaryTreeForLayoutCalculation = (
  someTree: SomeTree
): someTree is TemporaryTreeForLayoutCalculation => {
  return Object.prototype.hasOwnProperty.call(
    someTree,
    'occupiedWidthPosition'
  );
};

const isOptimizedTree = (
  anyTree: Tree | OptimizedTree
): anyTree is OptimizedTree => {
  return Object.prototype.hasOwnProperty.call(anyTree, 'width');
};

export type NodeSize = {
  width: number;
  height: number;
};

export type Edge = {
  id: number;
  top: number;
  left: number;
  width: number;
  color: StyleProperty;
  positionOfParent: 'left' | 'center' | 'right';
};

const depthFirstSearchForTree = (
  tree: Tree | OptimizedTree,
  callback: (
    targetNode: Tree | OptimizedTree,
    parentNode: Tree | OptimizedTree | null,
    currentRow: number
  ) => void
) => {
  const recursiveSearch = (
    targetNode: Tree,
    parentNode: Tree | null,
    currentRow: number
  ) => {
    callback(targetNode, parentNode, currentRow);
    targetNode.children.forEach((node) => {
      recursiveSearch(node, targetNode, currentRow + 1);
    });
  };
  recursiveSearch(tree, null, 1);
};

type CallbackOfGenerateTree = (
  originalNode: SomeTree,
  parentNode: SomeTree | null,
  currentRow: number
) => SomeTree;

const generateTree = (
  tree: SomeTree,
  callback: CallbackOfGenerateTree
): SomeTree => {
  const isRootNode = (arg: SomeTree | SomeTree[]): arg is SomeTree =>
    !Array.isArray(arg);

  const root = {
    ...callback(tree, null, 1),
    children: [...tree.children],
  };

  const recursive = (
    container: SomeTree | SomeTree[],
    originalNode: SomeTree,
    parentNode: SomeTree | null,
    currentRow: number
  ) => {
    let generatedNode: Tree;

    if (!isRootNode(container)) {
      generatedNode = {
        ...callback(originalNode, parentNode, currentRow),
        children: [...originalNode.children],
      };
      container.push(generatedNode);
      container.shift();
    }

    const nextChildren = !isRootNode(container)
      ? container[container.length - 1].children
      : container.children;
    const nextParentNode = generatedNode! ?? container;

    originalNode.children.forEach((child) => {
      recursive(nextChildren, child, nextParentNode, currentRow + 1);
    });
    return container;
  };

  const result = recursive(root, tree, null, 1);
  if (!isRootNode(result)) throw new Error(`${result} is not Tree.`);
  return result;
};

const getRowCount = (tree: Tree) => {
  const currentRowList: number[] = [];
  depthFirstSearchForTree(tree, (targetNode, parentNode, currentRow) => {
    currentRowList.push(currentRow);
  });
  return Math.max(...currentRowList);
};

export const calculateShapeDrawingAreaSize = ({
  tree,
  nodeSize,
  minSize,
}: {
  tree: Tree;
  nodeSize: NodeSize;
  minSize: {
    width: number;
    height: number;
  };
}) => {
  const rowCount = getRowCount(tree);

  const maxChildrenCountPerRow = [...Array(rowCount - 1)].map(() => 0);

  depthFirstSearchForTree(tree, (targetNode, parentNode, currentRow) => {
    const index = currentRow - 1;
    if (maxChildrenCountPerRow[index] === undefined) return;
    if (targetNode.children.length > maxChildrenCountPerRow[index]) {
      maxChildrenCountPerRow[index] = targetNode.children.length;
    }
  });

  // Maximum number of nodes placed in one row
  const maxCountOfNodesPlacedInOneRow = maxChildrenCountPerRow.reduce(
    (acc, item) => acc * item,
    1
  );

  const width =
    maxCountOfNodesPlacedInOneRow * nodeSize.width +
    (maxCountOfNodesPlacedInOneRow - 1) * SPACING_BETWEEN_NODES +
    PADDINGS.left +
    PADDINGS.right;

  const verticallyNodeCount =
    (rowCount - 1) * TREE.NODE_COUNT_BETWEEN_ROWS + rowCount;
  const height =
    verticallyNodeCount * nodeSize.height + PADDINGS.top + PADDINGS.bottom;

  return {
    width: width > minSize.width ? width : minSize.width,
    height: height > minSize.height ? height : minSize.height,
  };
};

const calculateOccupiedWidthPosition = (
  tree: Tree,
  drawingShapeAreaWidth: number
) => {
  const addOccupiedWidthPosition: CallbackOfGenerateTree = (
    originalNode,
    parentNode
  ): TemporaryTreeForLayoutCalculation => {
    if (parentNode === null) {
      const result: TemporaryTreeForLayoutCalculation = {
        ...originalNode,
        occupiedWidthPosition: {
          begin: 0,
          end: drawingShapeAreaWidth,
        },
      };
      return result;
    }

    if (!isTemporaryTreeForLayoutCalculation(parentNode)) {
      throw new Error('parentNode must be TemporaryTreeForLayoutCalculation.');
    }

    const parent = {
      occupiedWidthPosition: parentNode.occupiedWidthPosition,
      occupiedWidthSize:
        parentNode.occupiedWidthPosition.end -
        parentNode.occupiedWidthPosition.begin,
      childrenLength: parentNode.children.length,
    };
    const occupiedWidthPerNode = Math.floor(
      parent.occupiedWidthSize / parent.childrenLength
    );
    const calculatedNodesCount = parentNode.children.filter((node) =>
      Object.prototype.hasOwnProperty.call(node, 'occupiedWidthPosition')
    ).length;

    const begin =
      parent.occupiedWidthPosition.begin +
      occupiedWidthPerNode * calculatedNodesCount;
    const end = begin + occupiedWidthPerNode;

    const result: TemporaryTreeForLayoutCalculation = {
      ...originalNode,
      occupiedWidthPosition: {
        begin,
        end,
      },
    };
    return result;
  };

  const result = generateTree(tree, addOccupiedWidthPosition);
  if (!isTemporaryTreeForLayoutCalculation(result)) {
    throw new Error('result must be TemporaryTreeForLayoutCalculation.');
  }
  return result;
};

export const updateLayoutInformationOfTree = (
  tree: Tree,
  nodeSize: NodeSize,
  shapeDrawingAreaWidth: number
) => {
  const calculateTop = (row: number) =>
    (row - 1) * (TREE.NODE_COUNT_BETWEEN_ROWS + 1) * nodeSize.height +
    PADDINGS.top;

  const convertOccupiedWidthToLeft = (
    occupiedWidthPosition: OccupiedWidthPosition,
    nodeWidth: number
  ) => {
    const widthPerNode =
      occupiedWidthPosition.end - occupiedWidthPosition.begin;
    const nodeLeftMargin = Math.floor((widthPerNode - nodeWidth) / 2);
    return occupiedWidthPosition.begin + nodeLeftMargin;
  };

  const treeWithOccupiedWidthPositionAdded = calculateOccupiedWidthPosition(
    tree,
    shapeDrawingAreaWidth
  );

  const result = generateTree(
    treeWithOccupiedWidthPositionAdded,
    (originalNode, parentNode, currentRow) => {
      if (!isTemporaryTreeForLayoutCalculation(originalNode)) {
        throw new Error(
          'originalNode must be TemporaryTreeForLayoutCalculation'
        );
      }

      const newNode = {
        ...originalNode,
        layout: {
          top: calculateTop(currentRow),
          left: convertOccupiedWidthToLeft(
            originalNode.occupiedWidthPosition,
            nodeSize.width
          ),
        },
      };
      delete newNode.occupiedWidthPosition;
      return newNode;
    }
  );
  return result as Tree;
};

type OptimizeTargetInfo = {
  ids: number[];
  left: number;
  width: number;
};

const getOptimizeTargetInfo = (tree: OptimizedTree): OptimizeTargetInfo => {
  if (tree.children.length === 0) {
    return {ids: [tree.id], left: tree.layout.left, width: tree.width};
  }

  const ids: number[] = [];
  let mostLeftValue = Number.MAX_SAFE_INTEGER;
  let rightEnd = 0;
  depthFirstSearchForTree(tree, (originalNode) => {
    if (!isOptimizedTree(originalNode)) {
      throw new Error('is not OptimizeDTree in reduceDistanceBetweenTree');
    }

    ids.push(originalNode.id);

    const {left} = originalNode.layout;
    if (left < mostLeftValue) {
      mostLeftValue = left;
    }

    const right = originalNode.layout.left + originalNode.width;
    if (right > rightEnd) {
      rightEnd = right;
    }
  });

  return {
    ids,
    left: mostLeftValue,
    width: rightEnd - mostLeftValue,
  };
};

const calculateReduceDistanceValue = (
  optimizeTargets: OptimizeTargetInfo[],
  centered: number
) => {
  let reducedLeftValueList = [0];
  if (optimizeTargets.length % 2 === 0) {
    optimizeTargets.forEach((i, index) => {
      if (index !== 0) {
        const prevNodeInfo = optimizeTargets[index - 1];
        const {left, width} = prevNodeInfo;
        const adjustedValue =
          left +
          width +
          reducedLeftValueList[index - 1] +
          TREE.OPTIMAL_DISTANCE_TO_ADJACENT_NODE;
        reducedLeftValueList.push(adjustedValue - i.left);
      }
    });
    reducedLeftValueList = reducedLeftValueList.map(
      (value) => value + centered
    );
  } else {
    const centerElementIndex = Math.floor(optimizeTargets.length / 2);
    reducedLeftValueList[centerElementIndex] = 0.1;
    const numberOfLeftElements = centerElementIndex;
    for (let i = 1; i <= numberOfLeftElements; i += 1) {
      const leftElement = optimizeTargets[centerElementIndex - i];
      const nextElement = optimizeTargets[centerElementIndex - i + 1];
      const desirableRightEnd =
        nextElement.left +
        reducedLeftValueList[centerElementIndex - i + 1] -
        TREE.OPTIMAL_DISTANCE_TO_ADJACENT_NODE;
      const currentRightEnd = leftElement.left + leftElement.width;
      reducedLeftValueList[centerElementIndex - i] =
        desirableRightEnd - currentRightEnd;

      const rightElement = optimizeTargets[centerElementIndex + i];
      const prevElement = optimizeTargets[centerElementIndex + i - 1];
      const desirableLeft =
        prevElement.left +
        prevElement.width +
        reducedLeftValueList[centerElementIndex + i - 1] +
        TREE.OPTIMAL_DISTANCE_TO_ADJACENT_NODE;
      const currentLeft = rightElement.left;
      reducedLeftValueList[centerElementIndex + i] =
        desirableLeft - currentLeft;
    }
  }
  return reducedLeftValueList;
};

const reduceDistanceBetweenNode = (optimizeTargets: OptimizeTargetInfo[]) => {
  const start = Math.min(...optimizeTargets.map((i) => i.left));
  const end = Math.max(...optimizeTargets.map((i) => i.left + i.width));
  const currentSpace = end - start;

  const totalWidth = optimizeTargets.reduce((acc, i) => {
    return acc + i.width;
  }, 0);

  const actuallyNeededSpace =
    TREE.OPTIMAL_DISTANCE_TO_ADJACENT_NODE * (optimizeTargets.length - 1) +
    totalWidth;

  const centered = Math.floor((currentSpace - actuallyNeededSpace) / 2);

  const reducedLeftValueList = calculateReduceDistanceValue(
    optimizeTargets,
    centered
  );

  return optimizeTargets.map((i, index) => {
    return {
      ids: i.ids,
      adjustedLeftValue: reducedLeftValueList[index],
    };
  });
};

const applyOptimization = (
  tree: OptimizedTree,
  optimizeTargets: OptimizeTargetInfo[]
) => {
  const optimizationResult = reduceDistanceBetweenNode(optimizeTargets);

  depthFirstSearchForTree(tree, (originalNode) => {
    optimizationResult.forEach((result) => {
      if (result.ids.some((id) => id === originalNode.id)) {
        // eslint-disable-next-line no-param-reassign
        originalNode.layout.left += result.adjustedLeftValue;
      }
    });
  });
};

export const optimizeTree = (
  tree: Tree,
  nodeSizeObject: NodeSizeObject,
  maxNodeWidth: number
) => {
  const widthOptimizedTree = generateTree(tree, (originalNode) => {
    const targetNodeWidth = nodeSizeObject[originalNode.id].width;
    let {left} = originalNode.layout;
    if (targetNodeWidth !== maxNodeWidth) {
      const diff = maxNodeWidth - targetNodeWidth;
      left += Math.floor(diff / 2);
    }

    return {
      ...originalNode,
      layout: {
        ...originalNode.layout,
        left,
      },
      width: targetNodeWidth,
      height: nodeSizeObject[originalNode.id].height,
    };
  }) as OptimizedTree;

  const loopForOptimization = () => {
    depthFirstSearchForTree(widthOptimizedTree, (originalNode) => {
      if (!isOptimizedTree(originalNode)) {
        throw new Error('is not OptimizeDTree in optimizeTree');
      }
      if (originalNode.children.length > 0) {
        const optimizeTargets = originalNode.children.map((child) => {
          return getOptimizeTargetInfo(child);
        });
        applyOptimization(widthOptimizedTree, optimizeTargets);
      }
    });
  };

  // Reason for running it twice
  // I actually want to optimize from under the tree.
  // However, because it is difficult, we have optimized once from top to bottom and then optimized again.
  // By doing this, the same effect is obtained.
  loopForOptimization();
  loopForOptimization();

  return widthOptimizedTree;
};

const moveEntireTree = (
  tree: Tree | OptimizedTree,
  direction: {top: number; left: number}
) => {
  depthFirstSearchForTree(tree, (originalNode) => {
    /* eslint-disable no-param-reassign */
    originalNode.layout.top += direction.top;
    originalNode.layout.left += direction.left;
    /* eslint-enable no-param-reassign */
  });
};

export const optimizeEntireTreeDirection = (tree: OptimizedTree) => {
  let mostLeftValue = Number.MAX_SAFE_INTEGER;
  depthFirstSearchForTree(tree, (originalNode) => {
    const {left} = originalNode.layout;
    if (left < mostLeftValue) {
      mostLeftValue = left;
    }
  });
  moveEntireTree(tree, {top: 0, left: -mostLeftValue});
};

export const optimizeShapeDrawingAreaWidth = (
  tree: OptimizedTree,
  minWidth: number
) => {
  const width = getOptimizeTargetInfo(tree).width + PADDINGS.right;
  return width > minWidth ? width : minWidth;
};

export const editContentOfSpecifiedNode = (
  tree: Tree,
  targetNodeId: number,
  editContent: Partial<UserEditablePropertyOfTree>
) => {
  return generateTree(tree, (originalNode) => {
    if (targetNodeId !== originalNode.id) return originalNode;
    return {
      ...originalNode,
      ...editContent,
    };
  }) as Tree;
};

export const generateEdgesOfTree = (tree: OptimizedTree) => {
  const edges: Edge[] = [];

  depthFirstSearchForTree(tree, (targetNode, parentNode) => {
    if (parentNode === null) return;

    if (!isOptimizedTree(parentNode) || !isOptimizedTree(targetNode)) {
      throw new Error('is not OptimizeDTree in generateEdgesOfTree');
    }

    const top = parentNode.layout.top + targetNode.height;

    const parentNodeStandardPoint =
      parentNode.layout.left + Math.floor(parentNode.width / 2);
    const targetNodeStandardPoint =
      targetNode.layout.left + Math.floor(targetNode.width / 2);

    switch (true) {
      case parentNodeStandardPoint > targetNodeStandardPoint + 1: {
        const left = targetNode.layout.left + Math.floor(targetNode.width / 2);
        const width =
          parentNode.layout.left + Math.floor(parentNode.width / 2) - left;
        edges.push({
          id: targetNode.id,
          top,
          left,
          width: width === 0 ? 1 : width,
          color: targetNode.style.edgeColor,
          positionOfParent: 'right',
        });
        break;
      }
      case parentNodeStandardPoint < targetNodeStandardPoint - 1: {
        const left = parentNode.layout.left + Math.floor(parentNode.width / 2);
        const width =
          targetNode.layout.left + Math.floor(targetNode.width / 2) - left;
        edges.push({
          id: targetNode.id,
          top,
          left,
          width: width === 0 ? 1 : width,
          color: targetNode.style.edgeColor,
          positionOfParent: 'left',
        });
        break;
      }
      default:
        edges.push({
          id: targetNode.id,
          top,
          left: targetNode.layout.left,
          width: targetNode.width,
          color: targetNode.style.edgeColor,
          positionOfParent: 'center',
        });
        break;
    }
  });

  return edges;
};

export const generateNodeArrayFromTree = (tree: Tree | OptimizedTree) => {
  const deepClone = <T>(obj: T): T => {
    if (!(typeof obj === 'object')) {
      return obj;
    }
    if (obj === null) return obj;

    if ('constructor' in obj) {
      const cloneObj = new (obj as any).constructor();
      Object.entries(obj).forEach(([key, value]) => {
        cloneObj[key] = deepClone(value);
      });
      return cloneObj;
    }

    throw new Error('obj does not have constructor');
  };

  const result: NodeArray = [];

  depthFirstSearchForTree(tree, (targetNode, parentNode) => {
    const newNode = deepClone(targetNode);
    const childNodeCount = newNode.children.length;
    delete newNode.children;

    let width = 0;
    let height = 0;
    if (isOptimizedTree(newNode)) {
      width = newNode.width;
      height = newNode.height;
    }

    result.push({
      ...newNode,
      parentNodeId: parentNode ? parentNode.id : null,
      width,
      height,
      childNodeCount,
    });
  });

  return result;
};

// map structure is {id => childIndex[]}
const generateChildMapFromNodeArray = (array: NodeArray) => {
  const map: Map<number, number[]> = new Map();

  array.forEach((elem, index) => {
    if (elem.parentNodeId !== null) {
      if (map.has(elem.parentNodeId)) {
        const newValue = [...map.get(elem.parentNodeId)!, index];
        map.set(elem.parentNodeId, newValue);
      } else {
        map.set(elem.parentNodeId, [index]);
      }
    }
  });

  return map;
};

export const addNode = (
  tree: Tree,
  newNode: Omit<Tree, 'id'>,
  parentNodeId: number
) => {
  const nodeArray = generateNodeArrayFromTree(tree);
  const childMap = generateChildMapFromNodeArray(nodeArray);

  const nodeArrayWithChild: any[] = [...nodeArray];

  let isDone = false;

  let maxNodeId = 0;
  let addedNodeRef: any;
  nodeArrayWithChild.forEach((elem) => {
    /* eslint-disable no-param-reassign */
    delete elem.parentNodeId;
    elem.children = [];
    /* eslint-enable no-param-reassign */
    if (childMap.has(elem.id)) {
      const childIndexes = childMap.get(elem.id)!;
      childIndexes.forEach((childIndex) => {
        elem.children.push(nodeArrayWithChild[childIndex]);
      });
    }
    if (elem.id === parentNodeId) {
      elem.children.push(newNode);
      addedNodeRef = elem.children[elem.children.length - 1];
      isDone = true;
    }
    if (elem.id > maxNodeId) maxNodeId = elem.id;
  });

  if (!isDone) {
    throw new Error(`Not found node with id ${parentNodeId}`);
  }

  addedNodeRef.id = maxNodeId + 1;

  return nodeArrayWithChild[0] as Tree;
};

export const removeNode = (tree: Tree, targetNodeId: number) => {
  const nodeArray = generateNodeArrayFromTree(tree);

  if (nodeArray[0].id === targetNodeId) {
    throw new Error('Root node cannot remove');
  }

  const childMap = generateChildMapFromNodeArray(nodeArray);

  const nodeArrayWithChild: any[] = [...nodeArray];

  let isDone = false;

  nodeArrayWithChild.forEach((elem) => {
    /* eslint-disable no-param-reassign */
    delete elem.parentNodeId;
    elem.children = [];
    /* eslint-enable no-param-reassign */
    if (childMap.has(elem.id)) {
      const childIndexes = childMap.get(elem.id)!;
      childIndexes.forEach((childIndex) => {
        if (nodeArrayWithChild[childIndex].id === targetNodeId) {
          isDone = true;
        } else {
          elem.children.push(nodeArrayWithChild[childIndex]);
        }
      });
    }
  });

  if (!isDone) {
    throw new Error(`Not found node with id ${targetNodeId}`);
  }

  return nodeArrayWithChild[0] as Tree;
};

export const rotateChildren = (tree: Tree, targetNodeId: number) => {
  let isDone = false;

  const clone = generateTree(tree, (originalNode) => originalNode);

  depthFirstSearchForTree(clone, (node) => {
    if (node.id === targetNodeId) {
      isDone = true;
      if (node.children.length < 2) return;

      const firstItem = node.children.shift();
      if (!firstItem) {
        throw new Error(`firstItem is undefined`);
      }
      (node.children as Tree[]).push(firstItem);
    }
  });

  if (!isDone) {
    throw new Error(`Not found node with id ${targetNodeId}`);
  }

  return clone;
};
