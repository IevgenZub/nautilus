import { Component, OnInit } from '@angular/core';
import { Story } from '../story';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  selectedStory: Story;
  stories: Story[];

  constructor(private storyService: StoryService) {
    this.stories = this.storyService.getStories();
    this.selectedStory = this.stories[0];
  }

  selectStory(story: Story) {
    this.selectedStory = story;
  }

  ngOnInit() {
  }

}
