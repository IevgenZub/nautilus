import { EntityMetadataMap } from '@ngrx/data';
 
const entityMetadata: EntityMetadataMap = {
  Story: {}
};
 
const pluralNames = { Story: 'Stories' };
 
export const entityConfig = {
  entityMetadata,
  pluralNames
};
