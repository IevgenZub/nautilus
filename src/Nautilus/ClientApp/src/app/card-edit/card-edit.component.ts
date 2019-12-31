import { Component, Input } from '@angular/core';
import { Card, Story } from '../story';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StoryService } from '../story.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent {
  _story: Story;
  _card: Card;
  cardForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private storyService: StoryService) {
  }

  @Input()
  set card(card: Card) {
    this._card = card;

    this.cardForm = this.formBuilder.group({
      header: new FormControl(this._card.header, [Validators.required, Validators.minLength(3)]),
      title: new FormControl(this._card.title, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this._card.description, [Validators.required, Validators.minLength(3)])
    });

    this.resetForm();
  }

  @Input()
  set story(story: Story) {
    this._story = story;
  }

  get header() { return this.cardForm.get('header'); }
  get title() { return this.cardForm.get('title'); }
  get description() { return this.cardForm.get('description'); }
  get card(): Card { return this._card; }

  onSubmit(formValue: Card) {
    let card = this._story.cards.filter(c => c.id == this._card.id)[0];
    card.header = formValue.header;
    card.title = formValue.title;
    card.description = formValue.description;
    this.storyService.saveStory(this._story);
  }

  resetForm() {
    this.cardForm.setValue({ header: this._card.header, title: this._card.title, description: this._card.description});
  }
}
