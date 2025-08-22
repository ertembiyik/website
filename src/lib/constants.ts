import type { z } from 'astro/zod';
import MetaDefaultImage from '@/assets/images/meta-default.jpg';
import avatar from '@/assets/images/avatar.jpg';
import type { seoSchemaWithoutImage } from '@/content.config';
import astroConfig from 'astro.config.mjs';

export type AuthorInfo = {
  name: string;
  avatar: any;
  headline: string;
}

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
}

type DefaultConfigurationType = {
  baseUrl: string,
  author: AuthorInfo;
  seo: Seo;
}

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: astroConfig.site || 'https://ertembiyik.com',
  author: {
    avatar,
    name: 'Ertem Biyik',
    headline: 'Software Engineer',
  },
  seo: {
    title: 'Ertem Biyik — Software Engineer',
    description: '',
    type: 'website',
    image: MetaDefaultImage,
    twitter: {
      creator: '@ertembiyik'
    },
    robots: 'noindex, nofollow',
  }
};