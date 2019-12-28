import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-designer',
  templateUrl: './game-designer.component.html',
  styleUrls: ['./game-designer.component.css']
})
export class GameDesignerComponent implements OnInit {
  card: any = {header: '', title: '', story: ''};
  cardForm = this.formBuilder.group({
    header: new FormControl(this.card.header, [Validators.required, Validators.minLength(3)]),
    title: new FormControl(this.card.title, [Validators.required, Validators.minLength(3)]),
    story: new FormControl(this.card.story, [Validators.required, Validators.minLength(3)])
  });

  constructor(private formBuilder: FormBuilder) { }

  get header() { return this.cardForm.get('header'); }
  get title() { return this.cardForm.get('title'); }
  get story() { return this.cardForm.get('story'); }

  ngOnInit() {
  }

  onSubmit(formValue) {
    console.log(formValue);
  }
}
