import React, {Suspense, useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import {useSelector} from '@tree/store/index';
import {updateCommonSettingValue} from '@tree/store/commonSetting';

import {SideMenuContainer} from '@src/shared/components/SideMenuContainer/index';

const ColorPicker = React.lazy(() => import('@shared/components/ColorPicker'));

type EditCommonValueProps = {
  label: string;
  color: string;
  setColor: (color: string) => void;
  updateColor: () => void;
};

const EditCommonValue = ({
  label,
  color,
  setColor,
  updateColor,
}: EditCommonValueProps) => {
  return (
    <EditCommonValueStyled>
      <div>{label}</div>
      <ColorPickerStyled>
        <Suspense fallback="loading...">
          <ColorPicker
            color={color}
            setColor={setColor}
            disable={false}
            closePickerCallback={updateColor}
          />
        </Suspense>
      </ColorPickerStyled>
    </EditCommonValueStyled>
  );
};

const EditCommonValueStyled = styled.div`
  display: grid;
  grid-template-columns: 106px 1fr;
`;

const ColorPickerStyled = styled.div`
  grid-column: 2;
`;

export const SideMenu = () => {
  const commonSetting = useSelector((s) => s.history.present.commonSetting);
  const {textColor, nodeColor, edgeColor} = commonSetting;
  const dispatch = useDispatch();

  const [tempTextColor, setTempTextColor] = useState(textColor);
  const [tempNodeColor, setTempNodeColor] = useState(nodeColor);
  const [tempEdgeColor, setTempEdgeColor] = useState(edgeColor);

  const setTextColor = useCallback((color: string) => {
    setTempTextColor(color);
  }, []);
  const setNodeColor = useCallback((color: string) => {
    setTempNodeColor(color);
  }, []);
  const setEdgeColor = useCallback((color: string) => {
    setTempEdgeColor(color);
  }, []);

  useEffect(() => {
    setTextColor(commonSetting.textColor);
    setNodeColor(commonSetting.nodeColor);
    setEdgeColor(commonSetting.edgeColor);
  }, [commonSetting, setEdgeColor, setNodeColor, setTextColor]);

  const updateTextColor = useCallback(() => {
    dispatch(updateCommonSettingValue({textColor: tempTextColor}));
  }, [dispatch, tempTextColor]);
  const updateNodeColor = useCallback(() => {
    dispatch(updateCommonSettingValue({nodeColor: tempNodeColor}));
  }, [dispatch, tempNodeColor]);
  const updateEdgeColor = useCallback(() => {
    dispatch(updateCommonSettingValue({edgeColor: tempEdgeColor}));
  }, [dispatch, tempEdgeColor]);

  return (
    <SideMenuContainer>
      <Headline>Common value</Headline>
      <CommonValueList>
        <EditCommonValue
          label="Text color"
          color={tempTextColor}
          setColor={setTextColor}
          updateColor={updateTextColor}
        />
        <EditCommonValue
          label="Node color"
          color={tempNodeColor}
          setColor={setNodeColor}
          updateColor={updateNodeColor}
        />
        <EditCommonValue
          label="Edge color"
          color={tempEdgeColor}
          setColor={setEdgeColor}
          updateColor={updateEdgeColor}
        />
      </CommonValueList>
    </SideMenuContainer>
  );
};

const CommonValueList = styled.div`
  line-height: 38px;
`;

const Headline = styled.div`
  margin-bottom: 6px;
  font-size: 17px;
  font-weight: bold;
`;
