import { Component } from '@angular/core';
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
  story: Story;
  card: Card;
  cardForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private storyService: StoryService,
    private activatedRouter: ActivatedRoute,
    private router: Router,) {

    this.activatedRouter.queryParams.subscribe(params => {
      this.story = this.storyService.getStory(params['storyId']);
      if (params['cardId']) {
        var existingCards = this.story.cards.filter(c => c.id == params['cardId']);
        if (existingCards.length > 0) {
          this.card = existingCards[0];
        }
      }
    });

    if (!this.card) {
      this.card = new Card();
    }

    this.cardForm = this.formBuilder.group({
      header: new FormControl(this.card.header, [Validators.required, Validators.minLength(3)]),
      title: new FormControl(this.card.title, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.card.description, [Validators.required, Validators.minLength(3)])
    });

    this.resetForm();
  }

  get header() { return this.cardForm.get('header'); }
  get title() { return this.cardForm.get('title'); }
  get description() { return this.cardForm.get('description'); }

  onSubmit(formValue: Card) {
    this.card.header = formValue.header;
    this.card.title = formValue.title;
    this.card.description = formValue.description;

    //this.cardService.saveCard(this.card);
    this.router.navigate(['/game-designer'])
  }

  resetForm() {
    this.cardForm.setValue({ header: this.card.header, title: this.card.title, description: this.card.description});
  }
}
