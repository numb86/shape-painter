import assert from 'power-assert';

import {INITIALIZE_ACTION_TYPE, OVER_WRITE_ACTION_TYPE} from '@src/constants';

import {updateCommonSettingValue, commonSetting} from '../commonSetting';

describe('commonSetting', () => {
  const INITIAL_TEXT_COLOR = '#fff';
  const INITIAL_NODE_COLOR = '#000';
  const INITIAL_EDGE_COLOR = '#000';

  let initialState: {[k: string]: string} = {};
  beforeEach(() => {
    initialState = {
      textColor: INITIAL_TEXT_COLOR,
      nodeColor: INITIAL_NODE_COLOR,
      edgeColor: INITIAL_EDGE_COLOR,
    };
  });

  describe('action creator and reducer', () => {
    describe('UPDATE_COMMON_SETTING_VALUE', () => {
      it('Update with specified value', () => {
        const result = commonSetting(
          initialState as any,
          updateCommonSettingValue({textColor: '#333'})
        );

        assert.strictEqual(result.textColor, '#333');
        assert.strictEqual(result.nodeColor, INITIAL_NODE_COLOR);
        assert.strictEqual(result.edgeColor, INITIAL_EDGE_COLOR);
      });

      it('Multiple values ​​can be updated simultaneously', () => {
        const result = commonSetting(
          initialState as any,
          updateCommonSettingValue({textColor: '#123', nodeColor: '#789'})
        );

        assert.strictEqual(result.textColor, '#123');
        assert.strictEqual(result.nodeColor, '#789');
        assert.strictEqual(result.edgeColor, INITIAL_EDGE_COLOR);
      });

      it('Error will occur if invalid property is specified', () => {
        let isError = false;

        commonSetting(
          initialState as any,
          updateCommonSettingValue({textColor: '#333'})
        );
        assert(!isError);

        try {
          commonSetting(
            initialState as any,
            updateCommonSettingValue({notExistProperty: '#333'} as any)
          );
        } catch {
          isError = true;
        }
        assert(isError);
      });
    });

    describe('OVER_WRITE', () => {
      it('Overwrite state with passed setting', () => {
        const NEW_TEXT_COLOR = '#111';
        const NEW_NODE_COLOR = '#222';
        const NEW_EDGE_COLOR = '#333';

        const NEW_VALUE = {
          textColor: NEW_TEXT_COLOR,
          nodeColor: NEW_NODE_COLOR,
          edgeColor: NEW_EDGE_COLOR,
        };

        const result = commonSetting(initialState as any, {
          type: OVER_WRITE_ACTION_TYPE,
          payload: {
            commonSetting: NEW_VALUE,
          },
        });

        assert.strictEqual(result.textColor, NEW_TEXT_COLOR);
        assert.deepStrictEqual(result, NEW_VALUE);
      });
    });

    describe('INITIALIZE', () => {
      it('Return the initialState', () => {
        const definedInitialState = commonSetting(undefined, {
          foo: 'bar',
        } as any);

        const changedValue = commonSetting(
          definedInitialState,
          updateCommonSettingValue({textColor: '#333'})
        );

        assert.notDeepStrictEqual(changedValue, definedInitialState);
        assert.deepStrictEqual(
          commonSetting(changedValue, {type: INITIALIZE_ACTION_TYPE}),
          definedInitialState
        );
      });
    });

    it('Return the previous state as is if an unsupported action is passed', () => {
      assert(
        commonSetting(initialState as any, {foo: 'bar'} as any) === initialState
      );
    });
  });
});
