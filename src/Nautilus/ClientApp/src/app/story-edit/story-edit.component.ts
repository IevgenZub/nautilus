import { Component } from '@angular/core';
import { Card, Story } from '../story';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StoryService } from '../story.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent {
  story: Story;
  storyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storyService: StoryService,
    private activatedRouter: ActivatedRoute,
    private router: Router) {

    this.activatedRouter.queryParams.subscribe(params => {
      if (params['id']) {
        this.story = this.storyService.getStory(params['id']);
      }
    });

    if (!this.story) {
      this.story = new Story();
      this.story.name = "";
      this.story.entryCardId = "";
      this.story.cards = [];
    }

    this.storyForm = this.formBuilder.group({
      name: new FormControl(this.story.name, [Validators.required, Validators.minLength(3)]),
      entryCardId: new FormControl(this.story.entryCardId, [Validators.required, Validators.minLength(3)])
    });

    this.resetForm();
  }

  get name() { return this.storyForm.get('name'); }
  get entryCardId() { return this.storyForm.get('entryCardId'); }
  
  onSubmit(formValue: Story) {
    this.story.name = formValue.name;
    this.story.entryCardId= formValue.entryCardId;
    this.storyService.saveStory(this.story);
    
    this.router.navigate(['/story-list'])
  }

  resetForm() {
    this.storyForm.setValue({ name: this.story.name, entryCardId: this.story.entryCardId });
  }
}
