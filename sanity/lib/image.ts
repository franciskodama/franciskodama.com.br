import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '../env';

const imageBuilder = projectId
  ? createImageUrlBuilder({
      projectId: projectId || '',
      dataset: dataset || '',
    })
  : null;

export const urlForImage = (source: any) => {
  return imageBuilder?.image(source).auto('format').fit('max');
};
