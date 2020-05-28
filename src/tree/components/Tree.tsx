import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import styled from 'styled-components';

import {
  calculateShapeDrawingAreaSize,
  updateLayoutInformationOfTree,
  optimizeTree,
  generateNodeArrayFromTree,
  generateEdgesOfTree,
  NodeArrayElement,
  NodeArray,
  optimizeShapeDrawingAreaWidth,
  optimizeEntireTreeDirection,
} from '@tree/tree';
import {
  GA_MEASUREMENT_ID,
  DOWNLOAD_TARGET_ELEMENT_ID,
  DISPLAY_AREA_ELEMENT_ID,
  LAYOUT,
} from '@src/constants';
import {useSelector} from '@tree/store/index';
import {SideMenu} from '@tree/components/SideMenu';
import {Main} from '@shared/components/Main';

import {ElementForCollectNodeWidth} from '@tree/components/ElementForCollectNodeWidth';
import {NodeOfTree} from '@tree/components/NodeOfTree';
import {EdgeOfTree} from '@tree/components/EdgeOfTree';
import {NodeEditModal} from '@tree/components/NodeEditModal/index';
import {useModal} from '@shared/customHooks/useModal';
import {useReplaceReducer} from '@shared/customHooks/useReplaceReducer';
import {useStateDisappearWarning} from '@shared/customHooks/useStateDisappearWarning';
import {NodeSize} from '@tree/store/nodeSize';

const PADDING_FROM_SIDE_MENU = 30;

const isRootNode = (node: NodeArrayElement) => node.parentNodeId === null;

type Props = {
  treeMainRef: React.MutableRefObject<HTMLElement | null>;
};

export const Tree = () => {
  useEffect(() => {
    window.document.title = 'Tree - Shape Painter';
    if (process.env.NODE_ENV === 'production') {
      gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
        page_title: window.document.title,
      });
    }
  }, []);

  const state = useSelector((s) => s);
  const mainRef = useRef(null);

  const hasCorrectReducer = useCallback(() => {
    return (
      !!state.history && !!state.history.present && !!state.history.present.tree
    );
  }, [state]);

  useReplaceReducer(hasCorrectReducer);

  if (!hasCorrectReducer()) {
    return null;
  }
  return (
    <>
      <Main mainElementRef={mainRef}>
        <TreePrepare treeMainRef={mainRef} />
      </Main>
      <SideMenu />
    </>
  );
};

const TreePrepare = ({treeMainRef}: Props) => {
  const tree = useSelector((s) => s.history.present.tree);
  const nodeSize = useSelector((s) => s.nodeSize);

  let maxNodeSize = {width: 0, height: 0};
  Object.values(nodeSize).forEach((i) => {
    if (i.width > maxNodeSize.width) {
      maxNodeSize = {width: i.width, height: i.height};
    }
  });

  const nodeArray = generateNodeArrayFromTree(tree);

  const isAllNodeWidthHasCalculated = (
    /* eslint-disable no-shadow */
    nodeArray: NodeArray,
    nodeSize: NodeSize
    /* eslint-enable no-shadow */
  ) => {
    return nodeArray.every((node) => {
      if (!nodeSize[node.id]) return false;
      return nodeSize[node.id].text === node.text;
    });
  };

  if (!isAllNodeWidthHasCalculated(nodeArray, nodeSize)) {
    return (
      <>
        {nodeArray.map((node) => {
          return (
            <ElementForCollectNodeWidth
              key={node.id}
              id={node.id}
              text={node.text}
            />
          );
        })}
      </>
    );
  }

  return <TreeContent treeMainRef={treeMainRef} maxNodeSize={maxNodeSize} />;
};

const TreeContent = ({
  treeMainRef,
  maxNodeSize,
}: Props & {maxNodeSize: {width: number; height: number}}) => {
  const {present, past, future} = useSelector((s) => s.history);
  const {tree, commonSetting} = present;
  const displayScale = useSelector((s) => s.displayScale);
  const nodeSizeObject = useSelector((s) => s.nodeSize);

  const hasHistory = past.length > 0 || future.length > 0;
  useStateDisappearWarning(hasHistory);

  // If the tree width is large and use Safari, tree may not be displayed when removed node.
  // The code below is for that. Force scroll(0, 0) to run.
  const treeContainerRef: React.MutableRefObject<HTMLDivElement | null> = useRef(
    null
  );
  if (treeMainRef.current && treeContainerRef.current) {
    if (treeMainRef.current.scrollLeft > treeContainerRef.current.offsetWidth) {
      treeMainRef.current.scroll(0, 0);
    }
  }

  const {ref: modalRef, showModal, closeModal} = useModal();

  const [selectedNodeId, setSelectedNodeId] = useState(tree.id);

  const shapeDrawingAreaSize = useMemo(() => {
    return calculateShapeDrawingAreaSize({
      tree,
      nodeSize: maxNodeSize,
      minSize: {
        width: LAYOUT.SIDE_MENU_WIDTH,
        height: window.innerHeight - LAYOUT.HEADER_HEIGHT,
      },
    });
  }, [maxNodeSize, tree]);

  const layoutInformationUpdatedTree = useMemo(() => {
    return updateLayoutInformationOfTree(
      tree,
      maxNodeSize,
      shapeDrawingAreaSize.width
    );
  }, [maxNodeSize, shapeDrawingAreaSize.width, tree]);

  const optimizedTree = useMemo(() => {
    return optimizeTree(
      layoutInformationUpdatedTree,
      nodeSizeObject,
      maxNodeSize.width
    );
  }, [layoutInformationUpdatedTree, maxNodeSize.width, nodeSizeObject]);

  optimizeEntireTreeDirection(optimizedTree);

  shapeDrawingAreaSize.width = useMemo(() => {
    return optimizeShapeDrawingAreaWidth(optimizedTree, LAYOUT.SIDE_MENU_WIDTH);
  }, [optimizedTree]);

  const edges = useMemo(() => {
    return generateEdgesOfTree(optimizedTree);
  }, [optimizedTree]);

  const nodeArray = useMemo(() => {
    return generateNodeArrayFromTree(optimizedTree);
  }, [optimizedTree]);

  const [userEditablePropertyOfTargetNode, targetNodeIsRoot] = useMemo(() => {
    let targetNode = nodeArray.find((item) => item.id === selectedNodeId);
    if (!targetNode) {
      // fallback
      targetNode = nodeArray.find((item) => item.id === tree.id);
    }
    if (!targetNode) {
      throw new Error(`No node with id ${tree.id} was found`);
    }
    return [
      {
        text: targetNode.text,
        style: targetNode.style,
      },
      isRootNode(targetNode),
    ];
  }, [nodeArray, selectedNodeId, tree.id]);

  const openNodeEditMenu = useCallback(
    (targetNodeId: number) => {
      setSelectedNodeId(targetNodeId);
      showModal();
    },
    [showModal]
  );

  return (
    <>
      <Container
        id={DOWNLOAD_TARGET_ELEMENT_ID}
        size={shapeDrawingAreaSize}
        left={PADDING_FROM_SIDE_MENU}
        ref={treeContainerRef}
      >
        <DisplayArea id={DISPLAY_AREA_ELEMENT_ID} displayScale={displayScale}>
          {edges.map((edge) => {
            const {id, color, ...rest} = edge;
            const {value, isOverrideByCommonSetting} = color;
            const appliedColor = isOverrideByCommonSetting
              ? commonSetting.edgeColor
              : value;
            return <EdgeOfTree key={id} color={appliedColor} {...rest} />;
          })}
          {nodeArray.map((node) => {
            const {textColor, backgroundColor} = node.style;
            const appliedTextColor = textColor.isOverrideByCommonSetting
              ? commonSetting.textColor
              : textColor.value;
            const appliedBackgroundColor = backgroundColor.isOverrideByCommonSetting
              ? commonSetting.nodeColor
              : backgroundColor.value;

            return (
              <NodeOfTree
                key={node.id}
                id={node.id}
                isRootNode={isRootNode(node)}
                text={node.text}
                style={{
                  color: appliedTextColor,
                  backgroundColor: appliedBackgroundColor,
                }}
                layout={{
                  ...node.layout,
                }}
                size={{width: node.width, height: node.height}}
                openNodeEditMenu={openNodeEditMenu}
              />
            );
          })}
        </DisplayArea>
      </Container>
      <NodeEditModal
        modalRef={modalRef}
        closeModal={closeModal}
        targetNodeId={selectedNodeId}
        currentState={userEditablePropertyOfTargetNode}
        targetNodeIsRoot={targetNodeIsRoot}
      />
    </>
  );
};

const Container = styled.div<{
  size: {width: number; height: number};
  left: number;
}>`
  position: relative;
  left: ${(props) => props.left}px;
  width: ${(props) => props.size.width}px;
  height: ${(props) => props.size.height}px;
  transform-origin: ${(props) => -props.left}px;
  background-color: #fff;
`;

const DisplayArea = styled.div<{
  displayScale: number;
}>`
  transform: ${(props) => `scale(${(props.displayScale * 100) / 100})`};
`;
