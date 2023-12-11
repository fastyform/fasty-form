This is a FastyForm (https://fastyform.com/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install and start supabase CLI:
[https://supabase.com/docs/guides/cli/getting-started?platform=npm#installing-the-supabase-cli](https://supabase.com/docs/guides/cli/getting-started?platform=npm#installing-the-supabase-cli)

Copy from your terminal your envs:
SUPABASE_URL
SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

Get rest of the envs:
NODEMAILER_PW
NODEMAILER_EMAIL
STRIPE_SECRET_KEY

Install stripe CLI
[https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

Add last env:
STRIPE_WEBHOOK_SECRET

After you create account locally you have to add role in table manually, because of not ending emails. Same with trainer_details if you create trainer account.

Add bucket with name 'profile-images' and public bucket option checked and also policy:
Allowed operation all checked
and bucket_id = 'profile-images' AND name = auth.uid()::text || '.jpeg'

If you want to do database migration (pushing local supabase changes to production) use before commit: supabase db diff --use-migra
