import { Component, OnInit, Input } from '@angular/core';
import { Card, Answer } from '../card';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
  @Input() card: Card;
  selectedAnswer: Answer;
  faPlus = faPlus;

  constructor() { }

  ngOnInit() {
    this.addAnswer();
  }

  addAnswer() {
    var newAnswer = new Answer();
    this.card.answers.push(newAnswer);
    this.selectedAnswer = newAnswer;
  }

  selectAnswer(answer: Answer) {
    this.selectedAnswer = answer;
  }
}
