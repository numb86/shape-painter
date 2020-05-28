import {renderHook, act} from '@testing-library/react-hooks';
import assert from 'power-assert';

import {useNodeEdit} from '../useNodeEdit';

describe('useNodeEdit', () => {
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

  it('The value passed as an argument becomes the initial state', () => {
    const {result} = renderHook(() => useNodeEdit(initialState));
    const [state] = result.current;
    assert.deepStrictEqual(state, initialState);
  });

  it('State is overwritten by the value passed to dispatch', () => {
    const {result} = renderHook(() => useNodeEdit(initialState));
    const dispatch = result.current[1];

    act(() => {
      dispatch({text: 'xyz'});
    });
    assert.strictEqual(result.current[0].text, 'xyz');
    assert.deepStrictEqual(result.current[0].style, initialState.style);

    act(() => {
      dispatch({
        style: {edgeColor: {value: 'rime', isOverrideByCommonSetting: false}},
      });
    });
    const [state] = result.current;

    assert.strictEqual(state.text, 'xyz');

    const {style} = state;
    const {backgroundColor: currentBackgroundColor} = style;
    assert.deepStrictEqual(
      currentBackgroundColor,
      initialState.style.backgroundColor
    );

    const {edgeColor: currentEdgeColor} = style;
    assert.strictEqual(currentEdgeColor.value, 'rime');
    assert.strictEqual(currentEdgeColor.isOverrideByCommonSetting, false);
  });
});
