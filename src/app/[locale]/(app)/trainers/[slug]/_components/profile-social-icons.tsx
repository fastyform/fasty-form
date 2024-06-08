'use client';

import { IconButton } from '@mui/material';
import { SocialLinks } from '@/app/[locale]/(app)/trainers/[slug]/_utils/utils';
import { socialLinksData } from './edit-profile-form-components';

interface ProfileSocialIconsProps {
  socialLinks: SocialLinks;
}

const ProfileSocialIcons = ({ socialLinks }: ProfileSocialIconsProps) => (
  <div className="flex gap-2.5">
    {socialLinksData.map(([type, Icon]) => {
      const href = socialLinks[type];

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
