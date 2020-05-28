import React, {useMemo, useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import {ModalTemplate} from '@shared/components/ModalTemplate';
import {editNodeActionCreator} from '@tree/store/tree';
import {UserEditablePropertyOfTree} from '@tree/tree';

import {Edit} from './Edit';

import {useNodeEdit} from './useNodeEdit';

type Props = Pick<
  React.ComponentProps<typeof ModalTemplate>,
  'modalRef' | 'closeModal'
> & {
  targetNodeId: number;
  currentState: UserEditablePropertyOfTree;
  targetNodeIsRoot: boolean;
};

const MODAL_WIDTH = 500;
const MAIN_ONE_SIDE_PADDING = 20;

export const NodeEditModal = ({
  modalRef,
  closeModal,
  targetNodeId,
  currentState,
  targetNodeIsRoot,
}: Props) => {
  const layoutSetting = useMemo(
    () => ({
      modalWidth: MODAL_WIDTH,
      mainOneSidePadding: MAIN_ONE_SIDE_PADDING,
    }),
    []
  );

  const [state, dispatch] = useNodeEdit(currentState);

  const reactReduxDispatch = useDispatch();

  useEffect(() => {
    dispatch(currentState);
  }, [currentState, dispatch]);

  const update = useCallback(() => {
    reactReduxDispatch(editNodeActionCreator(targetNodeId, state));
  }, [reactReduxDispatch, targetNodeId, state]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      update();
      closeModal(e);
    },
    [closeModal, update]
  );

  const onClickUpdateButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      update();
      closeModal(e);
    },
    [closeModal, update]
  );

  return (
    <ModalTemplate
      modalRef={modalRef}
      closeModal={closeModal}
      headerTitle="Edit node"
      layoutSetting={layoutSetting}
    >
      <Edit
        state={state}
        dispatch={dispatch}
        onSubmit={onSubmit}
        targetNodeIsRoot={targetNodeIsRoot}
      />
      <Buttons>
        <UpdateButton type="button" onClick={onClickUpdateButton}>
          Update
        </UpdateButton>

        <CancelButton type="button" onClick={closeModal}>
          Cancel
        </CancelButton>
      </Buttons>
    </ModalTemplate>
  );
};

const Buttons = styled.div`
  display: grid;
  grid-template-columns: ${MODAL_WIDTH - MAIN_ONE_SIDE_PADDING * 2} 1fr;
  grid-template-rows: 40px;
  margin-top: 50px;
  button {
    margin: 0 20px;
    border: none;
    color: #fff;
    font-size: 22px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      opacity: 0.3;
    }
  }
`;

const UpdateButton = styled.button`
  grid-column: 1;
  grid-row: 1;
  background-color: rgb(58, 210, 69);
`;

const CancelButton = styled.button`
  grid-column: 2;
  grid-row: 1;
  background-color: #f36;
`;
