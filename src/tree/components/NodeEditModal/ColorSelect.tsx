import React, {Suspense} from 'react';
import styled from 'styled-components';

const ColorPicker = React.lazy(() => import('@shared/components/ColorPicker'));

type Props = {
  label: string;
  color: string;
  useCommonValue: boolean;
  updateColor: (selectedColor: string, useCommonValue: boolean) => void;
  layoutSetting: {
    labelColumnWidth: number;
    checkboxColumnWidth: number;
  };
};

export const ColorSelect = React.memo(
  ({label, color, useCommonValue, updateColor, layoutSetting}: Props) => {
    const {labelColumnWidth, checkboxColumnWidth} = layoutSetting;

    const onClickCheckBox = () => {
      updateColor(color, !useCommonValue);
    };

    const setColor = (selectedColor: string) => {
      updateColor(selectedColor, useCommonValue);
    };

    return (
      <Container
        labelColumnWidth={labelColumnWidth}
        checkboxColumnWidth={checkboxColumnWidth}
      >
        <Label htmlFor="useCommonValue">{label}</Label>
        <UseCommonValue
          id="useCommonValue"
          type="checkbox"
          checked={useCommonValue}
          onChange={onClickCheckBox}
        />
        <Value>
          <Suspense fallback="loading...">
            <ColorPicker
              color={color}
              setColor={setColor}
              disable={useCommonValue}
            />
          </Suspense>
        </Value>
      </Container>
    );
  }
);

const Container = styled.div<{
  labelColumnWidth: number;
  checkboxColumnWidth: number;
}>`
  display: grid;
  grid-template-columns: ${(props) => props.labelColumnWidth}px ${(props) =>
      props.checkboxColumnWidth}px 1fr;
`;

const Label = styled.label`
  grid-column: 1;
`;

const UseCommonValue = styled.input`
  grid-column: 2;
`;

const Value = styled.div`
  grid-column: 3;
  text-align: center;
`;
