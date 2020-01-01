import { createAction, props } from '@ngrx/store';
import { Story } from './story';

export const fetchStories = createAction('[Story Component] fetchStories');
export const addStory = createAction('[Story Component] AddStory');
export const editStory = createAction('[Story Component] EditStory');
