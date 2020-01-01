import { createReducer, on } from '@ngrx/store';
import { fetchStories, addStory, editStory } from './story.actions';
import { Story } from './story';
 
export const initialState = <State> { stories: [] };
 
const _storyReducer = createReducer(initialState,
  on(fetchStories, state => state),
  on(addStory, state => state),
  on(editStory, state => state)
);
 
export function storyReducer(state, action) {
  return _storyReducer(state, action);
}

export interface State {
  stories: Story[];
}
