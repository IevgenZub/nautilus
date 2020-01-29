import { Component, OnInit } from '@angular/core';
import { Story } from '../story';
import { Observable } from 'rxjs';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-story-feed',
  templateUrl: './story-feed.component.html',
  styleUrls: ['./story-feed.component.css']
})
export class StoryFeedComponent  implements OnInit {
  stories$: Observable<Story[]>;

  constructor(private storyService: StoryService) {
    this.stories$ = storyService.entities$;
  }

  ngOnInit() {
    this.storyService.getAll();
  }
}
