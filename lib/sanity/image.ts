import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from './api';

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null;

export function urlForImage(source: Image) {
  if (!builder) return null;
  return builder.image(source);
}
