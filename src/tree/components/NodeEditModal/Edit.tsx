import React, {useMemo, useCallback} from 'react';
import styled from 'styled-components';

import {
  UserEditableStyleProperty,
  UserEditablePropertyOfTree,
} from '@tree/tree.ts';

import {ColorSelect} from './ColorSelect';

import {Action} from './useNodeEdit';

type Props = {
  state: UserEditablePropertyOfTree;
  dispatch: React.Dispatch<Action>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  targetNodeIsRoot: boolean;
};

const LABEL_COLUMN_WIDTH = 140;
const CHECKBOX_COLUMN_WIDTH = 200;

export const Edit = ({state, dispatch, onSubmit, targetNodeIsRoot}: Props) => {
  const layoutSetting = useMemo(
    () => ({
      labelColumnWidth: LABEL_COLUMN_WIDTH,
      checkboxColumnWidth: CHECKBOX_COLUMN_WIDTH,
    }),
    []
  );

  const {textColor, backgroundColor, edgeColor} = state.style;

  const onInputText = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const {value} = e.currentTarget;
      dispatch({text: value});
    },
    [dispatch]
  );

  const updateColor = useCallback(
    (
      propertyName: keyof UserEditableStyleProperty,
      selectedColor: string,
      useCommonValue: boolean
    ) => {
      dispatch({
        style: {
          [propertyName]: {
            value: selectedColor,
            isOverrideByCommonSetting: useCommonValue,
          },
        },
      });
    },
    [dispatch]
  );

  const updateTextColor = useCallback(
    (selectedColor: string, useCommonValue: boolean) => {
      updateColor('textColor', selectedColor, useCommonValue);
    },
    [updateColor]
  );

  const updateNodeColor = useCallback(
    (selectedColor: string, useCommonValue: boolean) => {
      updateColor('backgroundColor', selectedColor, useCommonValue);
    },
    [updateColor]
  );

  const updateEdgeColor = useCallback(
    (selectedColor: string, useCommonValue: boolean) => {
      updateColor('edgeColor', selectedColor, useCommonValue);
    },
    [updateColor]
  );

  return (
    <EditStyled>
      <TextContent>
        <TextContentLabel>Text</TextContentLabel>
        <form onSubmit={onSubmit}>
          <TextContentValue
            type="text"
            value={state.text}
            onChange={onInputText}
          />
        </form>
      </TextContent>

      <UseCommonValueCaption>
        <UseCommonValueCaptionLabel>
          Use common value
        </UseCommonValueCaptionLabel>
      </UseCommonValueCaption>

      <TextColor>
        <ColorSelect
          label="Text color"
          color={textColor.value}
          useCommonValue={textColor.isOverrideByCommonSetting}
          updateColor={updateTextColor}
          layoutSetting={layoutSetting}
        />
      </TextColor>

      <NodeColor>
        <ColorSelect
          label="Node color"
          color={backgroundColor.value}
          useCommonValue={backgroundColor.isOverrideByCommonSetting}
          updateColor={updateNodeColor}
          layoutSetting={layoutSetting}
        />
      </NodeColor>

      {!targetNodeIsRoot && (
        <EdgeColor data-testid="edge-color">
          <ColorSelect
            label="Edge color"
            color={edgeColor.value}
            useCommonValue={edgeColor.isOverrideByCommonSetting}
            updateColor={updateEdgeColor}
            layoutSetting={layoutSetting}
          />
        </EdgeColor>
      )}
    </EditStyled>
  );
};

const EditStyled = styled.div`
  display: grid;
  grid-template-rows: 20px 20px 20px 20px 20px;
  grid-row-gap: 18px;
  input[type='checkbox'] {
    margin: auto;
  }
`;

const TextContent = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: ${LABEL_COLUMN_WIDTH}px 1fr;

  input {
    font-size: 15px;
  }
`;

const TextContentLabel = styled.label`
  grid-column: 1;
  grid-row: 1;
`;

const TextContentValue = styled.input`
  grid-column: 2;
  grid-row: 1;
  width: 200px;
`;

const UseCommonValueCaption = styled.div`
  grid-row: 2;
  display: grid;
  grid-template-columns: ${LABEL_COLUMN_WIDTH}px ${CHECKBOX_COLUMN_WIDTH}px 1fr;
`;

const UseCommonValueCaptionLabel = styled.div`
  grid-column: 2;
  text-align: center;
`;

const TextColor = styled.div`
  grid-row: 3;
`;

const NodeColor = styled.div`
  grid-row: 4;
`;

const EdgeColor = styled.div`
  grid-row: 5;
`;
