// This test require `canvas`
// https://github.com/Automattic/node-canvas

import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import 'jest-styled-components';
import assert from 'power-assert';

import {ColorPicker} from '../ColorPicker';

describe('ColorPicker', () => {
  it('Swatch background color is props.color', () => {
    const {container: c1} = render(
      <ColorPicker color="#000" setColor={() => {}} disable={false} />
    );
    expect(c1.firstChild).toMatchSnapshot();

    const {container: c2} = render(
      <ColorPicker color="#f00" setColor={() => {}} disable={false} />
    );
    expect(c2.firstChild).toMatchSnapshot();

    const {container: c3} = render(
      <ColorPicker color="#aaa" setColor={() => {}} disable={false} />
    );
    expect(c3.firstChild).toMatchSnapshot();
  });

  describe('Click Frame', () => {
    it('SketchPicker opens when props.disable is false', () => {
      render(<ColorPicker color="#000" setColor={() => {}} disable={false} />);
      fireEvent.click(screen.getByRole('button'));
      assert(screen.queryByTestId('cover'));
    });

    it('SketchPicker does not open when props.disable is true', () => {
      render(<ColorPicker color="#000" setColor={() => {}} disable />);
      fireEvent.click(screen.getByRole('button'));
      assert(screen.queryByTestId('cover') === null);
    });
  });

  describe('Click Cover', () => {
    it('Close SketchPicker', () => {
      render(<ColorPicker color="#000" setColor={() => {}} disable={false} />);
      fireEvent.click(screen.getByRole('button'));
      assert(screen.queryByTestId('cover'));
      fireEvent.click(screen.getByTestId('cover'));
      assert(screen.queryByTestId('cover') === null);
    });

    it('Execute props.closePickerCallback', () => {
      const closePickerCallback = jest.fn();
      render(
        <ColorPicker
          color="#000"
          setColor={() => {}}
          disable={false}
          closePickerCallback={closePickerCallback}
        />
      );

      fireEvent.click(screen.getByRole('button'));
      expect(closePickerCallback).toHaveBeenCalledTimes(0);

      fireEvent.click(screen.getByTestId('cover'));
      expect(closePickerCallback).toHaveBeenCalledTimes(1);
    });
  });
});
