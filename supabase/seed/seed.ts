/* eslint-disable import/no-extraneous-dependencies */

import { copycat } from '@snaplet/copycat';
import { createSeedClient } from '@snaplet/seed';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env.local` });

const main = async () => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const seed = await createSeedClient({
    models: {
      trainers_details: {
        data: {
          profile_name: (ctx) => copycat.word(ctx.seed),
          profile_slug: (ctx) => copycat.word(ctx.seed),
          stripe_account_id: (ctx) => copycat.uuid(ctx.seed),
          is_onboarded: true,
          stripe_onboarding_status: 'verified',
        },
      },
      users: {
        data: {
          email: (ctx) => copycat.email(ctx.seed, { domain: 'snaplet.dev' }),
        },
      },
      user_data: {
        data: {
          role: 'trainer',
        },
      },
    },
  });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const { users } = await seed.users((x) => x(100));

  const promises = users.map(async (user) => {
    await supabase.from('user_data').delete().eq('user_id', user.id);
  });

  await Promise.all(promises);

  await seed.trainers_details(
    (x) =>
      x(100, {
        // @ts-ignore
        profile_image_url: (ctx) => `https://picsum.photos/1000/1000?${users[ctx.index].id}`,
      }),
    { connect: { users } },
  );

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log('Database seeded successfully!');

  process.exit();
};

main();
