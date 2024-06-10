'use client';

import { IconButton } from '@mui/material';
import { SOCIAL_LINKS, SocialLinks } from '@/app/[locale]/(app)/trainers/[slug]/_utils/utils';
import { socialToIconMap } from './edit-profile-form-components';

interface ProfileSocialIconsProps {
  socialLinks: SocialLinks;
}

const ProfileSocialIcons = ({ socialLinks }: ProfileSocialIconsProps) => (
  <div className="flex gap-2.5">
    {SOCIAL_LINKS.map((type) => {
      const href = socialLinks[type];
      const Icon = socialToIconMap[type];

      return (
        !!href && (
          <IconButton key={type} className="rounded-full border border-solid border-gray-600 bg-shark p-3" href={href}>
            <Icon className="size-7 fill-white" />
          </IconButton>
        )
      );
    })}
  </div>
);

export default ProfileSocialIcons;
