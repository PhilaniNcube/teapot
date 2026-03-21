/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from "next";

import config from "@payload-config";
import { RootPage } from "@payloadcms/next/views";
import { importMap } from "../importMap";
import { Suspense } from "react";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Admin",
};

const Page = ({ params, searchParams }: Args) => (
  <Suspense fallback={<div>Loading...</div>}>
    <RootPage config={config} params={params} searchParams={searchParams} importMap={importMap} />
  </Suspense>
);

export default Page;
