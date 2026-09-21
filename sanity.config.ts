'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './lib/sanity/api';

export default defineConfig({
  basePath: '/studio',
  name: 'kd-law-studio',
  title: 'Adv. KD — Content Studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
