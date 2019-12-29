import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CardService } from '../card.service';
import { Card, Answer } from '../card';

@Component({
  selector: 'app-game-designer',
  templateUrl: './game-designer.component.html',
  styleUrls: ['./game-designer.component.css']
})
export class GameDesignerComponent {
  card: Card;
  cards: Card[];
  cardForm: FormGroup; 

  constructor(private formBuilder: FormBuilder, private cardService: CardService) {
    this.cards = this.cardService.getSavedCards();
    this.card = new Card();   

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
    this.card.title = formValue.header;
    this.card.story = formValue.story;

    this.cardService.saveCard(this.card);
    this.cards = this.cardService.getSavedCards();
  }


  selectCard(card: Card) {
    this.card = card;
    this.resetForm();
  }

  resetForm() {
    this.cardForm.setValue({ header: this.card.header, title: this.card.title, story: this.card.story });
  }
}
