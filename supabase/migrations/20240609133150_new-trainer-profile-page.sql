alter table "public"."trainers_details" add column "bio" text not null default ''::text;

alter table "public"."trainers_details" add column "social_links" jsonb not null default '{"tiktok": "", "youtube": "", "facebook": "", "instagram": ""}'::jsonb;


