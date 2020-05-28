import React from 'react';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import assert from 'power-assert';

import {configureStore} from '@shared/configureStore';
import {reducer} from '@tree/store/index';

import {NodeOfTree} from '../NodeOfTree';

describe('NodeOfTree', () => {
  const TEXT = 'ABC';

  let props: React.ComponentProps<typeof NodeOfTree>;
  beforeEach(() => {
    props = {
      id: 1,
      isRootNode: true,
      text: TEXT,
      style: {
        color: '#000',
        backgroundColor: '#87ceeb',
      },
      layout: {
        top: 10,
        left: 400,
      },
      size: {
        width: 100,
        height: 50,
      },
      openNodeEditMenu: jest.fn(),
    };
  });

  const WrappedComponentInProvider = () => (
    <Provider store={configureStore(reducer)}>
      <NodeOfTree {...props} />
    </Provider>
  );

  describe('Event passed in props is executed', () => {
    it('openNodeEditMenu', () => {
      const {getByTestId} = render(<WrappedComponentInProvider />);
      expect(props.openNodeEditMenu).toHaveBeenCalledTimes(0);
      fireEvent.click(getByTestId('node'));
      expect(props.openNodeEditMenu).toHaveBeenCalledTimes(1);
    });
  });

  it('Show props.text', () => {
    const {getByTestId} = render(<WrappedComponentInProvider />);
    const {textContent} = getByTestId('node');
    assert(textContent?.includes(TEXT));
  });
});
