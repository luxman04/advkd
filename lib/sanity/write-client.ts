import 'server-only';
import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from './api';

const token = process.env.SANITY_API_WRITE_TOKEN;

export const sanityWriteClient =
  projectId && token
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        token,
        useCdn: false,
      })
    : null;
