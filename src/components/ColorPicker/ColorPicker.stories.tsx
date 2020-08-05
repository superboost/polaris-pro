import { Card } from "@shopify/polaris";
import { withQuery } from "@storybook/addon-queryparams";
import React, { ReactElement } from "react";

import { toast } from "../../utils";
import { ColorPicker } from "./ColorPicker";
export default {
  title: "颜色选择器",
  component: ColorPicker,
  decorators: [withQuery],
};

export const 基本使用 = (): ReactElement => {
  return (
    <Card>
      <Card.Section>
        <ColorPicker onChange={(color) => toast({ content: color })} />
      </Card.Section>
      <h3>设置名称</h3>
      <br />
      <Card.Section>
        <ColorPicker
          title="Button"
          onChange={(color) => toast({ content: color })}
        />
      </Card.Section>
      <Card.Section>
        <h3>设置默认值</h3>
        <br />
        <ColorPicker
          color="#ccc"
          onChange={(color) => toast({ content: color })}
        />
      </Card.Section>
      <Card.Section>
        <h3>透明值</h3>
        <br />
        <ColorPicker
          allowAlpha
          color="rgba(0,0,0,0.5)"
          onChange={(color) => toast({ content: color })}
        />
      </Card.Section>
    </Card>
  );
};
