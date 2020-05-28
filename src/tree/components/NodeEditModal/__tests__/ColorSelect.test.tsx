import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import assert from 'power-assert';

import {ColorSelect} from '../ColorSelect';

describe('ColorSelect', () => {
  const LABEL_TEXT = 'Node color';

  describe('props.useCommonValue is the initial value of checkbox', () => {
    it('when false', () => {
      render(
        <ColorSelect
          label={LABEL_TEXT}
          color="#ff0"
          useCommonValue={false}
          updateColor={() => {}}
          layoutSetting={{
            labelColumnWidth: 20,
            checkboxColumnWidth: 30,
          }}
        />
      );
      assert.strictEqual((screen.getByRole('checkbox') as any).checked, false);
    });

    it('when true', () => {
      render(
        <ColorSelect
          label={LABEL_TEXT}
          color="#ff0"
          useCommonValue
          updateColor={() => {}}
          layoutSetting={{
            labelColumnWidth: 20,
            checkboxColumnWidth: 30,
          }}
        />
      );
      assert.strictEqual(
        // TODO: https://github.com/testing-library/react-testing-library/issues/636
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (screen.getByRole('checkbox', {name: LABEL_TEXT}) as any).checked,
        true
      );
    });
  });

  it('Clicking checkbox call props.updateColor', () => {
    const COLOR = '#555';
    const USE_COMMON_VALUE = false;
    const updateColor = jest.fn();

    render(
      <ColorSelect
        label={LABEL_TEXT}
        color={COLOR}
        useCommonValue={USE_COMMON_VALUE}
        updateColor={updateColor}
        layoutSetting={{
          labelColumnWidth: 20,
          checkboxColumnWidth: 30,
        }}
      />
    );

    expect(updateColor).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(updateColor).toHaveBeenCalledTimes(1);
    expect(updateColor).toHaveBeenCalledWith(COLOR, !USE_COMMON_VALUE);
  });
});
