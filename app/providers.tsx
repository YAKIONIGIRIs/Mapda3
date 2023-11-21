"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import {
  ThirdwebProvider,
  metamaskWallet,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <ThirdwebProvider
        activeChain="mumbai"
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        supportedWallets={[
          metamaskWallet(),
          localWallet(),
          embeddedWallet({
            auth: {
              options: ["email", "google", "facebook"],
            },
          }),
        ]}
      >
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </ThirdwebProvider>
    </NextUIProvider>
  );
}
