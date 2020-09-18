import { Card } from "@shopify/polaris";
import { withQuery } from "@storybook/addon-queryparams";
import React, { ReactElement, useState } from "react";

import { toast } from "../../utils";
import { DatePicker } from "./DatePicker";
export default {
  title: "日期选择",
  component: DatePicker,
  decorators: [withQuery],
};

export const 默认值为空 = (): ReactElement => {
  const [value, setValue] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  return (
    <Card>
      <Card.Section>
        <div style={{ width: 250 }}>
          <DatePicker
            value={value}
            error={showError && "请输入正确的日期"}
            onChange={(time) => {
              toast({ content: time || "" });
              setValue(time);
              if (time) {
                setShowError(false);
              } else {
                setShowError(true);
              }
            }}
          />
        </div>
      </Card.Section>
    </Card>
  );
};

export const 有默认值 = (): ReactElement => {
  const [value, setValue] = useState<string | null>(new Date().toISOString());
  return (
    <Card>
      <Card.Section>
        <div style={{ width: 250 }}>
          <DatePicker
            value={value}
            onChange={(time) => {
              toast({ content: String(time) });
              setValue(time);
            }}
          />
        </div>
      </Card.Section>
    </Card>
  );
};
