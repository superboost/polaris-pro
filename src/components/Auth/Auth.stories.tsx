import { Toast } from "@shopify/polaris";
import { withQuery } from "@storybook/addon-queryparams";
import { Random } from "mockjs";
import React, { ReactElement, useCallback, useState } from "react";

import { Auth } from "../..";

export default {
  title: "认证",
  component: Auth,
  decorators: [withQuery],
};

export const RedirectToShopify = (): ReactElement => {
  return (
    <div style={{ height: 500 }}>
      <Auth clientId="" scope={[]} redirectTimeout={1000000} />
    </div>
  );
};

export const Callback = (): ReactElement => {
  const [code, setCode] = useState<string>();
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const callback = useCallback(
    (value) => {
      console.log("code:", value);
      setCode(value);
      toggleActive();
    },
    [toggleActive]
  );

  return (
    <div style={{ height: 500 }}>
      <Auth clientId="" scope={[]} callback={callback} />
      {active ? (
        <Toast content={`code: ${code}`} onDismiss={toggleActive} />
      ) : null}
    </div>
  );
};

export const ParameterError = (): ReactElement => {
  return (
    <div style={{ height: 500 }}>
      <Auth clientId="" scope={[]} />
    </div>
  );
};

RedirectToShopify.story = {
  name: "重定向到 Shopify",
  parameters: {
    query: {
      shop: `demo.myshopify.com`,
      code: null,
    },
  },
};

Callback.story = {
  name: "授权回调",
  parameters: {
    query: {
      code: Random.string("lower", 32, 32),
    },
  },
};

ParameterError.story = {
  name: "参数错误",
  parameters: {
    query: {
      shop: null,
      code: null,
    },
  },
};
