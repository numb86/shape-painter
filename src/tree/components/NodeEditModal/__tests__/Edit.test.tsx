import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import assert from 'power-assert';

import {Edit} from '../Edit';

describe('Edit', () => {
  const INITIAL_TEXT = 'abc';
  const INITIAL_STYLE_TEXT_COLOR = 'white';
  const INITIAL_STYLE_BACKGROUND_COLOR = 'black';
  const INITIAL_STYLE_EDGE_COLOR = 'green';

  const initialState = {
    text: INITIAL_TEXT,
    style: {
      textColor: {
        value: INITIAL_STYLE_TEXT_COLOR,
        isOverrideByCommonSetting: true,
      },
      backgroundColor: {
        value: INITIAL_STYLE_BACKGROUND_COLOR,
        isOverrideByCommonSetting: true,
      },
      edgeColor: {
        value: INITIAL_STYLE_EDGE_COLOR,
        isOverrideByCommonSetting: true,
      },
    },
  };

  describe('TextContent', () => {
    let dispatch: jest.Mock<any, any>;
    let onSubmit: jest.Mock<any, any>;
    let textbox: HTMLInputElement;

    beforeEach(() => {
      dispatch = jest.fn();
      onSubmit = jest.fn();

      render(
        <Edit
          state={initialState}
          dispatch={dispatch}
          onSubmit={onSubmit}
          targetNodeIsRoot={false}
        />
      );

      textbox = screen.getByRole('textbox') as HTMLInputElement;
    });

    it('props.state.text is the initial state of the textbox', () => {
      assert.strictEqual(textbox.value, INITIAL_TEXT);
    });

    it('Executing onChange event calls props.dispatch', () => {
      const NEW_TEXT = 'qwerty';
      expect(dispatch).toHaveBeenCalledTimes(0);
      fireEvent.change(textbox, {target: {value: NEW_TEXT}});
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toBeCalledWith({text: NEW_TEXT});
    });

    it('Executing onSubmit event calls props.onSubmit', () => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
      fireEvent.submit(textbox);
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('EdgeColor is not rendered when props.targetNodeIsRoot is true', () => {
    render(
      <Edit
        state={initialState}
        dispatch={() => {}}
        onSubmit={() => {}}
        targetNodeIsRoot
      />
    );
    assert(screen.queryByTestId('edge-color') === null);
  });
});
