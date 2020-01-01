"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngrx/store");
var story_actions_1 = require("./story.actions");
exports.initialState = { stories: [] };
var _storyReducer = store_1.createReducer(exports.initialState, store_1.on(story_actions_1.fetchStories, function (state) { return state; }), store_1.on(story_actions_1.addStory, function (state) { return state; }), store_1.on(story_actions_1.editStory, function (state) { return state; }));
function storyReducer(state, action) {
    return _storyReducer(state, action);
}
exports.storyReducer = storyReducer;
//# sourceMappingURL=story.reducer.js.map