// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Books } from "./collections/Books";
import { Blogs } from "./collections/Blogs";
import { Events } from "./collections/Events";
import { Stockists } from "./collections/Stockists";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Books, Blogs, Events, Stockists],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // database-adapter-config-start
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  // database-adapter-config-end
  sharp,
  plugins: [
    vercelBlobStorage({
      // Vercel Blob-specific arguments go here.
      // `readWriteToken` is required.
      collections: {
        media: true
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
      enabled: true,
      clientUploads: true,
    }),
  ],
});
