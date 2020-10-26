import {
  DatePicker as PolarisDatePicker,
  Icon,
  Popover,
  TextField,
} from "@shopify/polaris";
import { CalendarMajor } from "@shopify/polaris-icons";
import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { formatDate, isSameDay } from "../../utils";

const DatePickerWrapper = styled.div`
  width: 100%;
  padding: 1.6rem;
`;

const Label = styled.div`
  margin-bottom: 0.4rem;
`;

// 判断是不是正确的日期格式 YYYY-MM-DD
const pattern = /^((?:19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

export interface DatePickerProps {
  label?: string;
  value?: string | null;
  error?: string | boolean;
  onChange: (value: string | null) => void;
}

export const DatePicker: FC<DatePickerProps> = ({
  label,
  value,
  error,
  onChange,
}) => {
  const [popoverActive, setPopoverActive] = useState(false);

  // 输入框绑定的值
  const [inputValue, setInputValue] = useState("");

  // 符合格式，正确的值
  const [correctValue, setCorrectValue] = useState("");

  const [{ month, year }, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });

  // value 有值且改变触发
  useEffect(() => {
    if (value) {
      setDate({
        month: new Date(value).getMonth(),
        year: new Date(value).getFullYear(),
      });
      setSelectedDates({ start: new Date(value), end: new Date(value) });
      setInputValue(formatDate(value));
      setCorrectValue(formatDate(value));
    } else {
      setInputValue("");
      setCorrectValue("");
    }
  }, [value]);

  const handleChange = useCallback(
    (time) => {
      // 重置，然后通过组件外部改变 value 值来重新生成组件内部的值
      if (value) {
        setInputValue(formatDate(value));
        setCorrectValue(formatDate(value));
      } else {
        setInputValue("");
        setCorrectValue("");
      }

      // 跟原来的日期不同再触发，防止相同的重复触发
      if (!isSameDay(new Date(value || ""), new Date(time))) {
        // 如果符合日期（例如 2 月 31 不符合）
        if (String(new Date(time)) !== "Invalid Date") {
          onChange(new Date(time).toISOString());
        }
        // 如果清空输入框
        if (time === "") {
          onChange(null);
        }
      }
    },
    [onChange, value]
  );

  return (
    <div>
      {label && <Label>{label}</Label>}
      <Popover
        active={popoverActive}
        // fluidContent
        activator={
          <TextField
            value={inputValue}
            type="text"
            autoComplete={false}
            prefix={<Icon source={CalendarMajor} />}
            onChange={(val) => {
              // 只能输入数字和 -
              setInputValue(val.replace(/[^\d|-]+/g, ""));

              // 符合正确的格式
              if (pattern.test(val)) {
                setCorrectValue(val);
                setSelectedDates({
                  start: new Date(val),
                  end: new Date(val),
                });
                const arr = val.split("-");
                setDate({ month: Number(arr[1]) - 1, year: Number(arr[0]) });
              }
              if (!val) {
                setCorrectValue(val);
              }
            }}
            label=""
            placeholder="YYYY-MM-DD"
            onFocus={() => setPopoverActive(true)}
            error={error}
          />
        }
        onClose={() => {
          setPopoverActive(false);
          handleChange(correctValue);
        }}
      >
        <DatePickerWrapper>
          <PolarisDatePicker
            month={month}
            year={year}
            onChange={(range) => handleChange(range.start.toISOString())}
            onMonthChange={(month, year) => setDate({ month, year })}
            selected={selectedDates}
          />
        </DatePickerWrapper>
      </Popover>
    </div>
  );
};
