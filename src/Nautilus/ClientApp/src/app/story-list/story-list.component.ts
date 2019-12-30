import { Component, OnInit } from '@angular/core';
import { Story } from '../story';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  stories: Story[];

  constructor(private storyService: StoryService) {
    this.stories = this.storyService.getStories();
  }

  ngOnInit() {
  }

}
