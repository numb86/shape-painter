import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components';
import dialogPolyfill from 'dialog-polyfill';

type Props = {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>;
  closeModal: (
    event:
      | React.MouseEvent<HTMLDialogElement | HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => void;
  headerTitle: string;
  layoutSetting: {
    modalWidth: number;
    mainOneSidePadding: number;
  };
};

export const ModalTemplate: React.FC<Props> = ({
  modalRef,
  closeModal,
  headerTitle,
  layoutSetting,
  children,
}) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      if (modalRef.current && !modalRef.current.showModal) {
        dialogPolyfill.registerDialog(modalRef.current);
      }
    }
  }, [modalRef]);

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );

  return (
    <Modal
      onClick={closeModal}
      ref={modalRef}
      width={layoutSetting.modalWidth}
      data-testid="modal"
    >
      <ModalBody onClick={stopPropagation} data-testid="modal-body">
        <Header data-testid="header">{headerTitle}</Header>
        <Main
          oneSidePadding={layoutSetting.mainOneSidePadding}
          data-testid="main"
        >
          {children}
        </Main>
      </ModalBody>
    </Modal>
  );
};

const BORDER_RADIUS = 30;

const Modal = styled.dialog<{width: number}>`
  /* For Native */
  &::backdrop {
    background-color: #000;
    opacity: 0.3;
  }

  /* For Polyfill */
  + .backdrop {
    background-color: #000;
    opacity: 0.3;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  &:not([open]) {
    display: none;
  }
  height: fit-content;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;

  width: ${(props) => props.width}px;
  top: 70px;
  border: none;
  padding: 0;
  background: transparent;
  color: #000;
`;

const ModalBody = styled.div``;

const Header = styled.header`
  background-color: #fff;
  border-bottom: 2px solid rgb(58, 171, 210);
  height: 45px;
  padding-top: 20px;
  border-top-left-radius: ${BORDER_RADIUS}px;
  border-top-right-radius: ${BORDER_RADIUS}px;
  font-size: 23px;
  text-align: center;
`;

const Main = styled.main<{oneSidePadding: number}>`
  background-color: #fff;
  padding: 30px ${(props) => props.oneSidePadding}px;
  border-bottom-left-radius: ${BORDER_RADIUS}px;
  border-bottom-right-radius: ${BORDER_RADIUS}px;
`;
