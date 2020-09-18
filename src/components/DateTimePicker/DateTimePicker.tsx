import React, { FC } from "react";
import styled from "styled-components";

import { DatePicker } from "../DatePicker";
import { TimePicker } from "../TimePicker";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    margin-right: 20px;
    margin-bottom: 10px;
  }
`;

export interface DateTimePickerProps {
  value: string | null;
  dateLabel?: string;
  timeLabel?: string;
  error?: string | boolean;
  onChange: (value: string | null) => void;
}

export const DateTimePicker: FC<DateTimePickerProps> = ({
  dateLabel,
  timeLabel,
  value,
  error,
  onChange,
}) => {
  return (
    <Wrapper>
      <DatePicker
        label={dateLabel}
        value={value}
        error={error}
        onChange={(val) => {
          const newValue = value ? new Date(value) : new Date();
          if (val) {
            newValue.setFullYear(new Date(val).getFullYear());
            newValue.setMonth(new Date(val).getMonth());
            newValue.setDate(new Date(val).getDate());
            onChange(newValue.toISOString());
          } else {
            onChange(null);
          }
        }}
      />
      <TimePicker
        label={timeLabel}
        error={!!error}
        hour={value ? new Date(value).getHours() : null}
        minute={value ? new Date(value).getMinutes() : null}
        onChange={(val) => {
          const newValue = value ? new Date(value) : new Date();
          newValue.setHours(val.hour);
          newValue.setMinutes(val.minute);
          onChange(newValue.toISOString());
        }}
      />
    </Wrapper>
  );
};
