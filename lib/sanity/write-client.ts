import 'server-only';
import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from './api';

const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  'skl5V4MchSLbyLBhdaxvdJViWgDvMunsgkJlB6NcoltA8ljOPNx7MBKYsy42mzmcSiK4DcPyPz37B9ghmXMUyKDte47Kt9x9wEZuPc3DwkQ0PstfDo3EvG7rB3lNKycL8C77wReDvdtZSIDLYDDgMkxVYApD8pNCwz9MCGu7u15dtrrPrCUe';

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
