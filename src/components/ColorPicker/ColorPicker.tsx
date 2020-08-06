import {
  ColorPicker as PolarisColorPicker,
  HSBAColor,
  hsbToHex,
  hsbToRgb,
  Popover,
  rgbString,
  rgbToHsb,
  TextField,
} from "@shopify/polaris";
import React, { FC, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

import { hexToRgb } from "../../utils";

const TitleWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  text-align: left;
`;

const ColorButton = styled.button<{ color: string }>`
  appearance: none;
  margin: 0;
  padding: 0;
  background: ${(props) => props.color};
  border: none;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  flex: 0 0 3.8rem;
  height: 2rem;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.07),
    inset 0 1px 3px 0 rgba(0, 0, 0, 0.15);

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 0 transparent, 0 0 0 2px #5c6ac4;
  }
`;

const Title = styled.span`
  margin-left: 0.8rem;
  font-size: 1.4rem;
  line-height: 2rem;
`;

const ColorPickerWrapper = styled.div<{ allowAlpha: boolean }>`
  padding: 0.8rem 0.8rem 0 0.8rem;
`;

const SettingColorWrapper = styled.div`
  margin: 0.8rem 0;
`;

const ColorCircle = styled.div<{ color: string }>`
  width: 2rem;
  height: 2rem;
  margin-left: -0.4rem;
  background: ${(props) => props.color};
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.07),
    inset 0 1px 3px 0 rgba(0, 0, 0, 0.15);
`;

export interface ColorPickerProps {
  allowAlpha?: boolean;
  color?: string;
  title?: ReactNode;
  onChange: (color: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  color: defaultColor,
  title,
  allowAlpha = false,
  onChange,
}) => {
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
    if (defaultColor && !triggerDefault) {
      setTriggerDefault(true);
      setInputValue(defaultColor);
      if (
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/.test(
          defaultColor
        )
      ) {
        const rgbArr = defaultColor
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
      } else if (/^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/.test(defaultColor)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hsb: any = rgbToHsb(hexToRgb(defaultColor));
        hsb.alpha = 1;
        setColor(hsb);
      }
    }
  }, [defaultColor, triggerDefault]);

  return (
    <Popover
      active={active}
      preferredAlignment="left"
      activator={
        <TitleWrapper>
          <ColorButton
            type="button"
            color={rgbString(hsbToRgb(color))}
            onClick={() => setActive(true)}
          />
          {title && <Title onClick={() => setActive(true)}>{title}</Title>}
        </TitleWrapper>
      }
      onClose={() => setActive(false)}
    >
      <ColorPickerWrapper allowAlpha={allowAlpha}>
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
              const newValue = { ...value };
              newValue.alpha = 1;
              setInputValue(hsbToHex(newValue));
              onChange(hsbToHex(newValue));
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
    </Popover>
  );
};
