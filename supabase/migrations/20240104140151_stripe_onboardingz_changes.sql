CREATE TYPE "public"."stripe_onboarding_status_enum" AS ENUM (
    'verified',
    'unverified',
    'pending_verification'
);

alter table "public"."trainers_details" drop column "is_onboarded_stripe";

alter table "public"."trainers_details" add column "stripe_onboarding_status" stripe_onboarding_status_enum not null default 'unverified'::stripe_onboarding_status_enum;


