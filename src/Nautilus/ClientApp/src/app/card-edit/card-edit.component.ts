import { Component } from '@angular/core';
import { Card } from '../card';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CardService } from '../card.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent {
  card: Card;
  cardForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private activatedRouter: ActivatedRoute,
    private router: Router,) {

    this.activatedRouter.queryParams.subscribe(params => {
      if (params['id']) {
        var existingCards = this.cardService.getSavedCards().filter(c => c.id == params['id']);
        if (existingCards.length > 0) {
          this.card = existingCards[0];
        }
      }
    });

    if (!this.card) {
      this.card = new Card();
    }

    this.cardForm = formBuilder.group({
      header: new FormControl(this.card.header, [Validators.required, Validators.minLength(3)]),
      title: new FormControl(this.card.title, [Validators.required, Validators.minLength(3)]),
      story: new FormControl(this.card.story, [Validators.required, Validators.minLength(3)])
    });

    this.resetForm();
  }

  get header() { return this.cardForm.get('header'); }
  get title() { return this.cardForm.get('title'); }
  get story() { return this.cardForm.get('story'); }

  onSubmit(formValue: Card) {
    this.card.header = formValue.header;
    this.card.title = formValue.title;
    this.card.story = formValue.story;

    this.cardService.saveCard(this.card);
    this.router.navigate(['/game-designer'])
  }

  resetForm() {
    this.cardForm.setValue({ header: this.card.header, title: this.card.title, story: this.card.story });
  }
}
