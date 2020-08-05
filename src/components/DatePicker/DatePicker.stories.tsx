import { Card } from "@shopify/polaris";
import { withQuery } from "@storybook/addon-queryparams";
import React, { ReactElement } from "react";

import { toast } from "../../utils";
import { DatePicker } from "./DatePicker";
export default {
  title: "日期选择",
  component: DatePicker,
  decorators: [withQuery],
};

export const 基本使用 = (): ReactElement => {
  return (
    <Card>
      <Card.Section>
        <DatePicker onChange={(time) => toast({ content: time })} />
      </Card.Section>
      <Card.Section>
        <h3>设置默认值</h3>
        <br />
        <DatePicker
          time={new Date().toISOString()}
          onChange={(time) => toast({ content: time })}
        />
      </Card.Section>
    </Card>
  );
};
