-- Drop the existing constraint on 'order_id'
ALTER TABLE "public"."submissions" DROP CONSTRAINT IF EXISTS "submissions_order_id_key";

-- Drop the existing index on 'order_id', if it exists
DROP INDEX IF EXISTS "public"."submissions_order_id_key";

-- Rename 'order_id' column to 'stripe_session_id'
ALTER TABLE "public"."submissions" RENAME COLUMN "order_id" TO "stripe_session_id";

-- Make 'price_in_grosz' column nullable
ALTER TABLE "public"."submissions" ALTER COLUMN "price_in_grosz" DROP NOT NULL;

-- Create a unique index on 'stripe_session_id', with a new name reflecting the column
CREATE UNIQUE INDEX submissions_stripe_session_id_key ON public.submissions USING btree (stripe_session_id);

-- Add a unique constraint using the new index on 'stripe_session_id', with a new name
ALTER TABLE "public"."submissions" ADD CONSTRAINT "submissions_stripe_session_id_key" UNIQUE USING INDEX submissions_stripe_session_id_key;