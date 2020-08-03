import { AppProvider, Frame, Toast, ToastProps } from "@shopify/polaris";
import React from "react";
import ReactDOM from "react-dom";

export function toast(props: Omit<ToastProps, "onDismiss">): void {
  const container = document.createElement("div");
  container.style.display = "none";
  document.body.appendChild(container);

  ReactDOM.render(
    <AppProvider i18n={{}}>
      <Frame>
        <Toast
          {...props}
          onDismiss={() => {
            ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
          }}
        />
      </Frame>
    </AppProvider>,
    container
  );
}
