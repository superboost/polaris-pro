import { DisplayText, Spinner } from "@shopify/polaris";
import React, { FC, useEffect } from "react";
import { useSearchParam } from "react-use";
import styled from "styled-components";

const re = /^[0-9a-z-]+.myshopify.com$/;

const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export interface AuthProps {
  clientId: string;
  redirectUri?: string;
  redirectTimeout?: number;
  scope: string[];
  callback?: (code: string) => void;
}

export const Auth: FC<AuthProps> = ({
  clientId,
  redirectUri = `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
  redirectTimeout = 0,
  scope = [],
  callback,
}) => {
  const code = useSearchParam("code");
  const shop = useSearchParam("shop");

  useEffect(() => {
    if (code && callback) {
      callback(code);
    }
  }, [code, callback]);

  useEffect(() => {
    if (!code && shop && re.test(shop)) {
      const timer = setTimeout(() => {
        const params = new URLSearchParams();
        params.set("client_id", clientId);
        params.set("redirect_uri", redirectUri);
        params.set("scope", scope.join(","));

        window.location.href = `https://${shop}/admin/oauth/authorize?${params.toString()}`;
      }, redirectTimeout);

      return () => clearTimeout(timer);
    }

    return () => {
      //
    };
  }, [code, shop, clientId, redirectUri, redirectTimeout, scope]);

  return (
    <AuthWrapper>
      {code ? (
        <Spinner size="large" />
      ) : (
        <DisplayText size="small">
          {shop && re.test(shop)
            ? "Redirect to Shopify..."
            : "Parameter error."}
        </DisplayText>
      )}
    </AuthWrapper>
  );
};
