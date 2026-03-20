import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "event_categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "event_categories_updated_at_idx" ON "event_categories" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "event_categories_created_at_idx" ON "event_categories" USING btree ("created_at");

    ALTER TABLE "events"
      ADD COLUMN IF NOT EXISTS "category_id" integer;

    CREATE INDEX IF NOT EXISTS "events_category_idx" ON "events" USING btree ("category_id");

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'events_category_id_event_categories_id_fk'
      ) THEN
        ALTER TABLE "events"
          ADD CONSTRAINT "events_category_id_event_categories_id_fk"
          FOREIGN KEY ("category_id")
          REFERENCES "public"."event_categories"("id")
          ON DELETE SET NULL;
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events"
      DROP CONSTRAINT IF EXISTS "events_category_id_event_categories_id_fk";

    DROP INDEX IF EXISTS "events_category_idx";

    ALTER TABLE "events"
      DROP COLUMN IF EXISTS "category_id";

    DROP INDEX IF EXISTS "event_categories_created_at_idx";
    DROP INDEX IF EXISTS "event_categories_updated_at_idx";

    DROP TABLE IF EXISTS "event_categories";
  `)
}