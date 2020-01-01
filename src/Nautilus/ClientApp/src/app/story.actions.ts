import { createAction } from '@ngrx/store';

export const fetchStories = createAction('[Story Component] fetchStories');
export const addStory = createAction('[Story Component] AddStory');
export const editStory = createAction('[Story Component] EditStory');
export const addCard = createAction('[Story Component] AddCard');
export const editCard = createAction('[Story Component] EditCard');
export const addAnswer = createAction('[Story Component] AddAnswer');
export const editAnswer = createAction('[Story Component] EditAnswer');
