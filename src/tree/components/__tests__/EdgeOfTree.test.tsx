import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';

import {EdgeOfTree} from '../EdgeOfTree';

describe('EdgeOfTree', () => {
  it('The content passed in props is reflected in the style', () => {
    const top = 20;
    const left = 300;
    const width = 100;
    const edge = {
      top,
      left,
      width,
      positionOfParent: 'center',
      color: 'skyblue',
    } as const;

    const {container: c1} = render(<EdgeOfTree {...edge} />);
    expect(c1.firstChild).toMatchSnapshot();

    const {container: c2} = render(
      <EdgeOfTree {...edge} positionOfParent="right" />
    );
    expect(c2.firstChild).toMatchSnapshot();

    const {container: c3} = render(
      <EdgeOfTree {...edge} positionOfParent="left" />
    );
    expect(c3.firstChild).toMatchSnapshot();
  });
});
