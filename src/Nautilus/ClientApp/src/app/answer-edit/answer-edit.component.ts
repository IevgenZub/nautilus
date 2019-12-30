import { Component, OnInit, Input } from '@angular/core';
import { Answer } from '../card';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css']
})
export class AnswerEditComponent {
  _answer: Answer;
  answerForm: FormGroup;

  @Input()
  set answer(answer: Answer) {
    this._answer = answer;

    this.answerForm = this.formBuilder.group({
      decision: new FormControl(this._answer.decision, [Validators.required, Validators.minLength(3)]),
      cardId: new FormControl(this._answer.cardId, [Validators.required])
    });

    this.answerForm.setValue({ decision: this._answer.decision, cardId: this._answer.cardId });
  }

  constructor(private formBuilder: FormBuilder) {
  }

  get decision() { return this.answerForm.get('decision'); }
  get cardId() { return this.answerForm.get('cardId'); }
  get answer(): Answer { return this._answer; }

  onSubmit(formValue: Answer) {
    this._answer.decision = formValue.decision;
    this._answer.cardId = formValue.cardId;
  }
}
