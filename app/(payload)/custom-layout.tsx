/* Custom Payload Layout Wrapper */
import config from "@payload-config";
import "@payloadcms/next/css";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React, { Suspense } from "react";
import { PayloadLoadingFallback } from "@/components/admin";

import { importMap } from "./admin/importMap.js";
import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const CustomPayloadLayout = ({ children }: Args) => (
  <Suspense fallback={<PayloadLoadingFallback />}>
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  </Suspense>
);

export default CustomPayloadLayout;