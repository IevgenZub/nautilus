import { Component } from '@angular/core';
import { Player, Card } from '../card';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent {
  faArrowRight = faArrowRight;
  public player: Player = new Player();
  public currentCard: Card = {
    id: 1,
    story: "A long time ago in a galaxy far, far away, Jar Jar Binks had a fungal infection. The history of poisoning in the future: lessons from Star Trek. Parachute use to prevent death and major trauma related to gravitational challenge...",
    header: "Introduction",
    title: "Let's get you into the story!",
    answers: [
      {
        decision: "Common... I don't have time for this...",
        cardId: "1",
        selected: true
      },
      {
        decision: "Tell me more about it!",
        cardId: "2",
        selected: false
      }
    ]
  };

  nextCard() {
    var answer = this.currentCard.answers.filter(a => a.selected == true)[0];
    console.log(answer);
  }

  selectAnswer(answer) {
    this.currentCard.answers.forEach(a => a.selected = false);
    answer.selected = true;
  }
}

