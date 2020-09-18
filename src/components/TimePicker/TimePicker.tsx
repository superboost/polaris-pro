import { ActionList, Icon, Popover, TextField } from "@shopify/polaris";
import { ClockMinor } from "@shopify/polaris-icons";
import { padStart } from "lodash";
import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const ActionListWrapper = styled.div`
  .Polaris-ActionList {
    padding: 0;
  }
`;

const Label = styled.div`
  margin-bottom: 0.4rem;
`;

const timeSelect = [
  "12:00 AM",
  "12:30 AM",
  "1:00 AM",
  "1:30 AM",
  "2:00 AM",
  "2:30 AM",
  "3:00 AM",
  "3:30 AM",
  "4:00 AM",
  "4:30 AM",
  "5:00 AM",
  "5:30 AM",
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

export interface TimePickerProps {
  hour: number | null;
  minute: number | null;
  label?: string;
  error?: boolean | string;
  onChange: (value: { hour: number; minute: number }) => void;
}

export const TimePicker: FC<TimePickerProps> = ({
  label,
  hour,
  minute,
  error,
  onChange,
}) => {
  // 与输入框绑定的值
  const [inputValue, setInputValue] = useState("");

  // 符合格式，正确的值
  const [correctValue, setCorrectValue] = useState("");

  const [active, setActive] = useState(false);

  // 根据 hour 和 minute 设置输入框的值
  const transformTimeToValue = useCallback(() => {
    if (hour !== null && minute !== null) {
      if (hour >= 12) {
        setInputValue(
          `${hour === 12 ? 12 : hour - 12}:${padStart(
            String(minute),
            2,
            "0"
          )} PM`
        );
        setCorrectValue(
          `${hour === 12 ? 12 : hour - 12}:${padStart(
            String(minute),
            2,
            "0"
          )} PM`
        );
      } else {
        setInputValue(
          `${hour === 0 ? 12 : hour}:${padStart(String(minute), 2, "0")} AM`
        );
        setCorrectValue(
          `${hour === 0 ? 12 : hour}:${padStart(String(minute), 2, "0")} AM`
        );
      }
    } else {
      setInputValue("");
      setCorrectValue("");
    }
  }, [hour, minute]);

  // 外部的 hour 和 minute 改变时，修改输入框的值
  useEffect(() => {
    transformTimeToValue();
  }, [transformTimeToValue]);

  const handleChange = useCallback(
    (time) => {
      // 重置输入框的值
      transformTimeToValue();

      if (time) {
        // [hour,minute]
        const arr = time.split(" ")[0].split(":");
        let newHour = Number(arr[0]);
        // AM
        if (/AM/.test(time)) {
          newHour = newHour === 12 ? 0 : newHour;
          // PM
        } else {
          newHour = newHour === 12 ? 12 : 12 + newHour;
        }
        onChange({ hour: newHour, minute: Number(arr[1]) });
      }
    },
    [onChange, transformTimeToValue]
  );

  return (
    <div>
      {label && <Label>{label}</Label>}
      <Popover
        active={active}
        fullWidth
        activator={
          <TextField
            label=""
            placeholder="HH:mm AM or PM"
            value={inputValue}
            error={error}
            onChange={(value) => {
              setInputValue(value);
              if (/^(0?[1-9]|1[0-2]):([0-5]?[0-9])\s(AM|PM)$/.test(value)) {
                let newValue = value;
                // 如果小时第一位是 0，删除 0
                if (value[0] === "0") {
                  newValue = value.slice(1);
                }
                // 如果分钟是个位数，加上 0
                const matched = newValue.match(/:[0-9]\s(AM|PM)$/);
                if (matched?.index) {
                  newValue = `${newValue.slice(
                    0,
                    matched.index + 1
                  )}0${newValue.slice(matched.index + 1)}`;
                }
                setCorrectValue(newValue);
              }
            }}
            prefix={<Icon source={ClockMinor} />}
            onFocus={() => setActive(true)}
          />
        }
        onClose={() => {
          setActive(false);
          handleChange(correctValue);
        }}
      >
        <ActionListWrapper>
          <ActionList
            items={timeSelect.map((item) => ({
              content: item,
              onAction: () => {
                setActive(false);
                handleChange(item);
              },
            }))}
          />
        </ActionListWrapper>
      </Popover>
    </div>
  );
};
