/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import {addNodeActionCreator, removeNodeActionCreator} from '@tree/store/tree';

type OpenNodeEditMenu = (targetNodeId: number) => void;
type AddChild = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;
type RemoveNode = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

type Size = {
  width: number;
  height: number;
};

type Props = {
  id: number;
  isRootNode: boolean;
  text: string;
  style: {
    color: string;
    backgroundColor: string;
  };
  layout: {
    top: number;
    left: number;
  };
  size: Size;
  openNodeEditMenu: OpenNodeEditMenu;
};

export const NodeOfTree = ({
  id,
  isRootNode,
  text,
  style,
  layout,
  size,
  openNodeEditMenu,
}: Props) => {
  const dispatch = useDispatch();
  const addChild = useCallback(() => {
    dispatch(addNodeActionCreator(id));
  }, [dispatch, id]);
  const removeNode = useCallback(() => {
    dispatch(removeNodeActionCreator(id));
  }, [dispatch, id]);

  const onNodeClick = useCallback(() => {
    openNodeEditMenu(id);
  }, [id, openNodeEditMenu]);

  return (
    <>
      <Node
        data-testid="node"
        style={style}
        layout={layout}
        size={size}
        onClick={onNodeClick}
      >
        <AddChildButton nodeWidth={size.width} onClick={addChild} />
        {!isRootNode && <RemoveNodeButton onClick={removeNode} />}
        {text}
      </Node>
    </>
  );
};

const AddChildButton = ({
  nodeWidth,
  onClick,
}: {
  nodeWidth: number;
  onClick: AddChild;
}) => (
  <AddChildButtonStyledComponent
    data-testid="addChildButton"
    type="button"
    nodeWidth={nodeWidth}
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
  >
    +
  </AddChildButtonStyledComponent>
);

const RemoveNodeButton = ({onClick}: {onClick: RemoveNode}) => (
  <RemoveNodeButtonStyledComponent
    data-testid="removeNodeButton"
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
  >
    &times;
  </RemoveNodeButtonStyledComponent>
);

const AddChildButtonStyledComponent = styled.button<{nodeWidth: number}>`
  &:hover {
    background-color: #0c9;
  }
  display: none;
  position: absolute;
  bottom: -14px;
  left: ${(props) => Math.floor(props.nodeWidth / 2) - 15}px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #fff;
  font-size: 23px;
  line-height: 27px;
  text-align: center;
  background-color: #888;
  border: none;
  cursor: pointer;
`;

const RemoveNodeButtonStyledComponent = styled.button`
  &:hover {
    background-color: #f36;
  }
  display: none;
  position: absolute;
  top: -12px;
  right: -14px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #fff;
  font-size: 23px;
  line-height: 27px;
  text-align: center;
  background-color: #888;
  border: none;
  cursor: pointer;
`;

const Node = styled.div<
  Pick<Props, 'style' | 'layout'> & {
    onClick: OpenNodeEditMenu;
    size: Size;
  }
>(
  (
    props: Pick<Props, 'style' | 'layout'> & {
      onClick: OpenNodeEditMenu;
      size: Size;
    }
  ) => {
    const {style, layout, size} = props;
    return `
  position: absolute;
  top: ${layout.top}px;
  left: ${layout.left}px;
  width: ${size.width}px;
  height: ${size.height}px;
  text-align: center;
  color: ${style.color};
  line-height: ${size.height}px;
  background-color: ${style.backgroundColor};
  cursor: pointer;
  border-radius: 20px;
  &:hover ${AddChildButtonStyledComponent} {
    display: block;
  }
  &:hover ${RemoveNodeButtonStyledComponent} {
    display: block;
  }
`;
  }
);
