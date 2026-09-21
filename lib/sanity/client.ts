import 'server-only';
import { createClient } from '@sanity/client';
import { apiVersion, dataset, isSanityConfigured, projectId } from './api';

// useCdn: true = fast, cached reads for public content (what the live site uses).
// Combined with the webhook in app/api/revalidate/route.ts, published changes still
// show up quickly because we explicitly revalidate Next's cache on publish.
export const sanityClient = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []): Promise<T | null> {
  if (!sanityClient) {
    // Sanity isn't configured yet (no env vars set). Fail soft so the site still builds
    // and runs — pages that depend on this will just show "no posts yet" instead of crashing.
    return null;
  }
  return sanityClient.fetch<T>(query, params, {
    next: { tags },
  });
}
