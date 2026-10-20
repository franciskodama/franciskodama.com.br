import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './sanity/env';

export default defineConfig({
  title: 'franciskodama.com.br',
  basePath: '/studio',
  projectId: projectId || 'demo-project-id',
  dataset: dataset || 'production',
  schema,
  plugins: [structureTool()],
});
