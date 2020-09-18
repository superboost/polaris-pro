import { Card } from "@shopify/polaris";
import { withQuery } from "@storybook/addon-queryparams";
import React, { ReactElement, useState } from "react";

import { toast } from "../../utils";
import { DateTimePicker } from "./DateTimePicker";
export default {
  title: "日期时间选择",
  component: DateTimePicker,
  decorators: [withQuery],
};

export const 默认值为空 = (): ReactElement => {
  const [time, setTime] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  return (
    <Card>
      <Card.Section>
        <DateTimePicker
          dateLabel="日期"
          timeLabel="时间"
          value={time}
          error={showError && "请输入正确的日期"}
          onChange={(value) => {
            toast({ content: JSON.stringify(value) });
            setTime(value);
            if (value) {
              setShowError(false);
            } else {
              setShowError(true);
            }
          }}
        />
      </Card.Section>
    </Card>
  );
};

export const 有默认值 = (): ReactElement => {
  const [time, setTime] = useState<string | null>(new Date().toISOString());
  return (
    <Card>
      <Card.Section>
        <DateTimePicker
          dateLabel="日期"
          timeLabel="时间"
          value={time}
          onChange={(value) => {
            toast({ content: JSON.stringify(value) });
            setTime(value);
          }}
        />
      </Card.Section>
    </Card>
  );
};
