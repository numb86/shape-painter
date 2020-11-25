import React, {useState, useEffect, useCallback, useRef} from 'react';
import {SketchPicker, ColorResult} from 'react-color';
import styled from 'styled-components';

type Props = {
  color: string;
  setColor: (selectedColor: string) => void;
  disable: boolean;
  closePickerCallback?: () => void;
};

type PopoverProps = Pick<
  Required<Props>,
  'color' | 'setColor' | 'closePickerCallback'
> & {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popover = ({
  color,
  setColor,
  closePickerCallback,
  setVisibility,
}: PopoverProps) => {
  const selectColor = useCallback(
    (result: ColorResult) => {
      setColor(result.hex);
    },
    [setColor]
  );

  const willUnMount = useRef(false);

  const closePicker = useCallback(() => {
    willUnMount.current = true;
    setVisibility(false);
  }, [setVisibility]);

  useEffect(() => {
    return () => {
      if (willUnMount.current) {
        closePickerCallback();
      }
    };
  }, [closePickerCallback]);

  return (
    <PopoverStyled>
      <Cover onClick={closePicker} data-testid="cover" />
      <SketchPicker color={color} onChangeComplete={selectColor} />
    </PopoverStyled>
  );
};

const ColorPicker = ({
  color,
  setColor,
  disable,
  closePickerCallback = () => {},
}: Props) => {
  const [visibility, setVisibility] = useState(false);

  const openPicker = useCallback(() => {
    if (disable) return;
    setVisibility(true);
  }, [disable]);

  return (
    <>
      <Frame type="button" disable={disable} onClick={openPicker}>
        <Swatch color={color} disable={disable} />
      </Frame>
      {visibility && (
        <Popover
          color={color}
          setColor={setColor}
          setVisibility={setVisibility}
          closePickerCallback={closePickerCallback}
        />
      )}
    </>
  );
};

export default ColorPicker;

const Swatch = styled.div<{color: string; disable: boolean}>`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
  visibility: ${(props) => (props.disable ? 'hidden' : 'visible')};
`;

const Frame = styled.button<{disable: boolean}>`
  border: none;
  padding: 5px;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: ${(props) => (props.disable ? 'not-allowed' : 'pointer')};
  background-color: #fff;
  background-image: ${(props) =>
    props.disable
      ? `linear-gradient(
    to right top,
    rgba(255, 255, 255, 0) 46%,
    #f00 49%,
    #f00 51%,
    rgba(255, 255, 255, 0) 54%
  )`
      : 'none'};
`;

const PopoverStyled = styled.div`
  position: absolute;
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.2;
`;
