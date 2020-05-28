import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import 'jest-styled-components';
import assert from 'power-assert';

import {ModalTemplate} from '../ModalTemplate';

describe('ModalTemplate', () => {
  let closeModal: jest.Mock<any, any>;
  const HEADER_TITLE = 'headerText';
  const MAIN_CONTENT = 'abc';
  let firstChild: ChildNode;

  beforeEach(() => {
    closeModal = jest.fn();

    const {container} = render(
      <ModalTemplate
        modalRef={React.createRef()}
        closeModal={closeModal}
        headerTitle={HEADER_TITLE}
        layoutSetting={{
          modalWidth: 200,
          mainOneSidePadding: 55,
        }}
      >
        {MAIN_CONTENT}
      </ModalTemplate>
    );

    firstChild = container.firstChild!;
  });

  it('Clicking Modal calls props.closeModal', () => {
    expect(closeModal).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByTestId('modal'));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('Clicking Modal content does not call props.closeModal', () => {
    expect(closeModal).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByTestId('modal-body'));
    expect(closeModal).toHaveBeenCalledTimes(0);
  });

  it('props.headerTitle becomes content of header', () => {
    assert.strictEqual(screen.getByTestId('header').textContent, HEADER_TITLE);
  });

  it('props.children appears in main', () => {
    assert.strictEqual(screen.getByTestId('main').textContent, MAIN_CONTENT);
  });

  it('Contents of props.layoutSetting are reflected in the style', () => {
    expect(firstChild).toMatchSnapshot();
  });
});
