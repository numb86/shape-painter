import React from 'react';
import {create, act} from 'react-test-renderer';

import {useModal} from '../useModal';

describe('useModal', () => {
  let showModalTrigger: () => void;
  let closeModalTrigger: () => void;
  let showModalMock: jest.Mock<any, any>;
  let closeModalMock: jest.Mock<any, any>;

  const Dialog = () => {
    const {ref, showModal, closeModal} = useModal();
    showModalTrigger = showModal;
    closeModalTrigger = closeModal;
    return <dialog ref={ref}>sample</dialog>;
  };

  beforeEach(() => {
    showModalMock = jest.fn();
    closeModalMock = jest.fn();

    act(() => {
      create(<Dialog />, {
        createNodeMock: (element) => ({
          ...element,
          showModal: showModalMock,
          close: closeModalMock,
        }),
      });
    });
  });

  describe('showModal', () => {
    it('`showModal` method of the element that passed the ref is called', () => {
      expect(showModalMock).toHaveBeenCalledTimes(0);
      showModalTrigger();
      expect(showModalMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('closeModal', () => {
    it('`close` method of the element that passed the ref is called', () => {
      expect(closeModalMock).toHaveBeenCalledTimes(0);
      closeModalTrigger();
      expect(closeModalMock).toHaveBeenCalledTimes(1);
    });
  });
});
