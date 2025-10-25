/* Custom Admin Page Wrapper */
import type { Metadata } from "next";
import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";
import { Suspense } from "react";
import { PayloadMinimalFallback } from "@/components/admin";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const CustomAdminPage = ({ params, searchParams }: Args) => (
  <Suspense fallback={<PayloadMinimalFallback />}>
    <RootPage 
      config={config} 
      params={params} 
      searchParams={searchParams} 
      importMap={importMap} 
    />
  </Suspense>
);

export default CustomAdminPage;