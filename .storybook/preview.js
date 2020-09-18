import "@shopify/polaris/dist/styles.css";

import React from "react";
import { AppProvider, Frame } from "@shopify/polaris";
import { addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import enTranslations from "@shopify/polaris/locales/en.json";

addDecorator(withInfo());

addDecorator((storyFn) => (
  <AppProvider i18n={enTranslations}>
    <Frame>{storyFn()}</Frame>
  </AppProvider>
));
