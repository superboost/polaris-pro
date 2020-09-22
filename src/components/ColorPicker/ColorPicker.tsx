import {
  ColorPicker as PolarisColorPicker,
  HSBAColor,
  hsbToHex,
  hsbToRgb,
  rgbString,
  rgbToHsb,
  TextField,
} from "@shopify/polaris";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import styled from "styled-components";

import { hexToRgb } from "../../utils";

const TitleWrapper = styled.span`
  position: relative;

  display: inline-flex;
  align-items: center;

  cursor: pointer;
`;

const ColorButton = styled.button<{ color: string }>`
  width: 38px;
  height: 20px;
  margin: 0;
  padding: 0;

  cursor: pointer;

  border: none;
  border-radius: 3px;
  background: ${(props) => props.color};
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.07),
    inset 0 1px 3px 0 rgba(0, 0, 0, 0.15);

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 0 transparent, 0 0 0 2px #5c6ac4;
  }
`;

const Title = styled.span`
  padding-left: 8px;
`;

const ColorPickerWrapper = styled.div`
  position: absolute;
  z-index: 999;
  top: 25px;

  margin-bottom: 20px;

  padding: 8px 8px 0 8px;

  border-radius: 6px;

  background: #fff;
  box-shadow: 0 0 0 1px rgba(6, 44, 82, 0.1), 0 2px 16px rgba(33, 43, 54, 0.08);
`;

const SettingColorWrapper = styled.div`
  margin: 8px 0;
`;

const ColorCircle = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  margin-left: -4px;

  border-radius: 50%;
  background: ${(props) => props.color};
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.07),
    inset 0 1px 3px 0 rgba(0, 0, 0, 0.15);
`;

export interface ColorPickerProps {
  allowAlpha?: boolean;
  defaultValue?: string;
  title?: ReactNode;
  onChange: (color: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  defaultValue,
  title,
  allowAlpha = false,
  onChange,
}) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [triggerDefault, setTriggerDefault] = useState(false);
  const [color, setColor] = useState<HSBAColor>({
    hue: 300,
    brightness: 0,
    saturation: 0,
    alpha: 100,
  });
  const [inputValue, setInputValue] = useState("");

  // 设置默认值，之后改变不触发
  useEffect(() => {
    if (defaultValue && !triggerDefault) {
      setTriggerDefault(true);
      setInputValue(defaultValue);
      if (
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/.test(
          defaultValue
        )
      ) {
        const rgbArr = defaultValue
          .replace(/[^\d*.?\d*,]/g, "")
          .split(",")
          .map((item) => Number(item));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hsb: any = rgbToHsb({
          red: rgbArr[0],
          green: rgbArr[1],
          blue: rgbArr[2],
        });
        hsb.alpha = rgbArr[3] || 1;
        setColor(hsb);
      } else if (/^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/.test(defaultValue)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hsb: any = rgbToHsb(hexToRgb(defaultValue));
        hsb.alpha = 1;
        setColor(hsb);
      }
    }
  }, [defaultValue, triggerDefault]);

  useClickAway(ref, () => {
    setActive(false);
  });

  return (
    <TitleWrapper ref={ref}>
      <ColorButton
        type="button"
        color={rgbString(hsbToRgb(color))}
        onClick={() => setActive(!active)}
      />
      {title && <Title onClick={() => setActive(!active)}>{title}</Title>}
      {active && (
        <ColorPickerWrapper>
          <PolarisColorPicker
            onChange={(value) => {
              setColor(value);
              if (allowAlpha) {
                if (value.alpha === 1) {
                  setInputValue(hsbToHex(value));
                  onChange(hsbToHex(value));
                } else {
                  const newValue = { ...value };
                  newValue.alpha = Number(value.alpha.toFixed(2));
                  setInputValue(rgbString(hsbToRgb(newValue)));
                  onChange(rgbString(hsbToRgb(newValue)));
                }
              } else {
                setInputValue(hsbToHex(value));
                onChange(hsbToHex(value));
              }
            }}
            color={color}
            allowAlpha={allowAlpha}
          />
          <SettingColorWrapper>
            <TextField
              label=""
              prefix={<ColorCircle color={rgbString(hsbToRgb(color))} />}
              value={inputValue}
              onChange={(value) => {
                setInputValue(value);
                onChange(value);
                if (
                  /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/.test(
                    value
                  )
                ) {
                  const rgbArr = value
                    .replace(/[^\d*.?\d*,]/g, "")
                    .split(",")
                    .map((item) => Number(item));
                  if (rgbArr.length > 2) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const hsb: any = rgbToHsb({
                      red: rgbArr[0],
                      green: rgbArr[1],
                      blue: rgbArr[2],
                    });
                    hsb.alpha = rgbArr[3] || 1;
                    setColor(hsb);
                  }
                } else if (/^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/.test(value)) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const hsb: any = rgbToHsb(hexToRgb(value));
                  hsb.alpha = 1;
                  setColor(hsb);
                }
              }}
            />
          </SettingColorWrapper>
        </ColorPickerWrapper>
      )}
    </TitleWrapper>
  );
};
