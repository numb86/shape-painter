import assert from 'power-assert';

import {
  MAX_DISPLAY_SCALE,
  MIN_DISPLAY_SCALE,
  INITIALIZE_ACTION_TYPE,
} from '@src/constants';

import {setAbsoluteValue, displayScale} from '../displayScale';

describe('displayScale', () => {
  describe('action creator and reducer', () => {
    describe('SET_ABSOLUTE_VALUE', () => {
      it('Returns the specified value', () => {
        assert.strictEqual(displayScale(1, setAbsoluteValue(0.8)), 0.8);
      });

      it('Error will occur if the maximum value is exceeded', () => {
        let isError = false;

        displayScale(1, setAbsoluteValue(MAX_DISPLAY_SCALE));
        assert(!isError);

        try {
          displayScale(1, setAbsoluteValue(MAX_DISPLAY_SCALE + 0.1));
        } catch {
          isError = true;
        }
        assert(isError);
      });

      it('Error will occur if less than the minimum value', () => {
        let isError = false;

        displayScale(1, setAbsoluteValue(MIN_DISPLAY_SCALE));
        assert(!isError);

        try {
          displayScale(1, setAbsoluteValue(MIN_DISPLAY_SCALE - 0.1));
        } catch {
          isError = true;
        }
        assert(isError);
      });
    });

    describe('INITIALIZE', () => {
      it('Return the initialState', () => {
        const initialState = displayScale(undefined, {type: 'foobar'} as any);
        assert.strictEqual(
          displayScale(0.98, {type: INITIALIZE_ACTION_TYPE}),
          initialState
        );
      });
    });

    it('Return the previous state as is if an unsupported action is passed', () => {
      assert.strictEqual(displayScale(0.75, {type: 'foobar'} as any), 0.75);
    });
  });
});
