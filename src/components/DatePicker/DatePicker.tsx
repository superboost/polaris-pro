import {
  DatePicker as PolarisDatePicker,
  Icon,
  Popover,
  TextField,
} from "@shopify/polaris";
import { CalendarMajorMonotone } from "@shopify/polaris-icons";
import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DatePickerWrapper = styled.div`
  width: 100%;
  padding: 1.6rem;
`;

function formatDate(date: string): string {
  return `${new Date(date).getFullYear()}-${
    new Date(date).getMonth() + 1
  }-${new Date(date).getDate()}`;
}

export interface DatePickerProps {
  time?: string;
  onChange: (time: string) => void;
}

export const DatePicker: FC<DatePickerProps> = ({ time, onChange }) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [defaultValue, setDefaultValue] = useState(false);
  const [{ month, year }, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  // 设置初始值，之后不触发
  useEffect(() => {
    if (time && !defaultValue) {
      setDefaultValue(true);
      setDate({
        month: new Date(time).getMonth(),
        year: new Date(time).getFullYear(),
      });
      setSelectedDates({ start: new Date(time), end: new Date(time) });
      setInputValue(formatDate(time));
    }
  }, [defaultValue, time]);

  return (
    <Wrapper>
      <Popover
        active={popoverActive}
        activator={
          <div onClick={() => setPopoverActive(true)}>
            <TextField
              value={inputValue}
              type="text"
              autoComplete={false}
              prefix={<Icon source={CalendarMajorMonotone} />}
              onChange={(value) => {
                setInputValue(value.replace(/[^\d|-]+/g, ""));
                if (String(new Date(value)) !== "Invalid Date") {
                  setDate({
                    month: new Date(value).getMonth(),
                    year: new Date(value).getFullYear(),
                  });
                  setSelectedDates({
                    start: new Date(value),
                    end: new Date(value),
                  });
                  onChange(new Date(value).toISOString());
                }
              }}
              label=""
              placeholder="YYYY-MM-DD"
            />
          </div>
        }
        onClose={() => setPopoverActive(false)}
      >
        <DatePickerWrapper>
          <PolarisDatePicker
            month={month}
            year={year}
            onChange={(range) => {
              setSelectedDates({
                start: range.start,
                end: range.start,
              });
              setInputValue(formatDate(new Date(range.start).toDateString()));
              onChange(new Date(range.start).toISOString());
            }}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
          />
        </DatePickerWrapper>
      </Popover>
    </Wrapper>
  );
};
