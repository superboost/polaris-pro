import "@shopify/polaris/dist/styles.css";

import React from "react";
import { AppProvider, Frame } from "@shopify/polaris";
import { addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

addDecorator(
  withInfo({
    styles: {},
    inline: true,
    source: false,
  })
);

addDecorator((storyFn) => (
  <AppProvider>
    <Frame>{storyFn()}</Frame>
  </AppProvider>
));
