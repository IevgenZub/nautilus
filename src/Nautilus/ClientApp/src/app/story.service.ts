import { Injectable } from '@angular/core';
import { Story} from './story';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class StoryService extends EntityCollectionServiceBase<Story> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Story', serviceElementsFactory);
  }
}
