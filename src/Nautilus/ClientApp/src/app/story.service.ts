import { Injectable, Inject } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Story } from './story';
import { SAVED_STORIES_KEY } from './constants';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  readonly SAVED_STORIES_KEY = SAVED_STORIES_KEY;
  
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    if (!this.storage.has(this.SAVED_STORIES_KEY)) {
      this.storage.set(this.SAVED_STORIES_KEY, []);
    } 
  }

  getStories() : Story[] {
    return this.storage.get(this.SAVED_STORIES_KEY);
  }

  getStory(id: number): Story {
    var stories = <Story[]> this.storage.get(this.SAVED_STORIES_KEY);
    return stories.filter(s => s.id == id)[0];
  }

  saveStory(story: Story) {
    story.cards.forEach((c, i) => c.id = i + 1);  
    var stories = <Story[]>this.storage.get(this.SAVED_STORIES_KEY);
    var existing = stories.filter(s => s.id == story.id)[0];
    if (existing) {
      existing.name = story.name;
      existing.isActive = story.isActive;
      existing.entryCardId = story.entryCardId;
      existing.cards = story.cards;
    }
    else {
      story.id = stories.length + 1;
      stories.push(story);
    }

    this.storage.set(this.SAVED_STORIES_KEY, stories);
  }

  deleteStory(name: string) {
    var stories = <Story[]>this.storage.get(this.SAVED_STORIES_KEY);
    stories =  stories.filter(s => s.name != name);
    this.storage.set(this.SAVED_STORIES_KEY, stories);
  }
}
