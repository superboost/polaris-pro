import { Card } from "@shopify/polaris";
import { withQuery } from "@storybook/addon-queryparams";
import React, { ReactElement, useState } from "react";

import { toast } from "../../utils";
import { TimePicker } from "./TimePicker";
export default {
  title: "时间选择",
  component: TimePicker,
  decorators: [withQuery],
};

export const 默认值为空 = (): ReactElement => {
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);

  return (
    <Card>
      <Card.Section>
        <TimePicker
          hour={hour}
          minute={minute}
          onChange={(value) => {
            toast({ content: JSON.stringify(value) });
            setHour(value.hour);
            setMinute(value.minute);
          }}
        />
      </Card.Section>
    </Card>
  );
};

export const 有默认值 = (): ReactElement => {
  const [hour, setHour] = useState<number | null>(14);
  const [minute, setMinute] = useState<number | null>(30);

  return (
    <Card>
      <Card.Section>
        <TimePicker
          hour={hour}
          minute={minute}
          onChange={(value) => {
            toast({ content: JSON.stringify(value) });
            setHour(value.hour);
            setMinute(value.minute);
          }}
        />
      </Card.Section>
    </Card>
  );
};
