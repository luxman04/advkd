export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Use a dated API version (not "v1") so Sanity's API behaviour doesn't change under you.
// See https://www.sanity.io/docs/api-versioning — bump this occasionally, deliberately.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-01';

export const isSanityConfigured = Boolean(projectId);
