import { Component } from '@angular/core';
import { Card } from '../card';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent {
  card: Card;
  cardForm: FormGroup; 

  constructor(private formBuilder: FormBuilder, private cardService: CardService) {
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
  }

  resetForm() {
    this.cardForm.setValue({ header: this.card.header, title: this.card.title, story: this.card.story });
  }
}
