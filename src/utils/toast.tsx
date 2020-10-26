import { AppProvider, Frame, Toast, ToastProps } from "@shopify/polaris";
import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const FrameWrapper = styled.div`
  .Polaris-Frame {
    min-height: initial;
  }
`;

const CustomToast: FC<ToastProps> = ({ onDismiss, ...rest }) => {
  const [active, setActive] = useState(false);

  useEffect(() => setActive(true), [setActive]);

  return (
    <AppProvider i18n={{}}>
      <FrameWrapper>
        <Frame>
          {active ? (
            <Toast
              {...rest}
              onDismiss={() => {
                setActive(false);
                setTimeout(onDismiss, 1000);
              }}
            />
          ) : null}
        </Frame>
      </FrameWrapper>
    </AppProvider>
  );
};

export function toast(props: Omit<ToastProps, "onDismiss">): void {
  const container = document.createElement("div");
  document.body.appendChild(container);

  ReactDOM.render(
    <CustomToast
      {...props}
      onDismiss={() => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
      }}
    />,
    container
  );
}
