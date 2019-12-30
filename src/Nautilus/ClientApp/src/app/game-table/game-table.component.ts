import { Component } from '@angular/core';
import { Player, Card } from '../card';
import { faArrowRight, faUndo } from '@fortawesome/free-solid-svg-icons';
import { CardService } from '../card.service';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent {
  faArrowRight = faArrowRight;
  faUndo = faUndo;
  public player: Player = new Player();
  public currentCard: Card;

  constructor(private cardService: CardService) {
    this.restart();
  }

  nextCard() {
    var answer = this.currentCard.answers.filter(a => a.selected == true)[0];
    var nextCard = this.cardService.getSavedCards().filter(c => c.title == answer.cardId)[0];
    if (nextCard) {
      this.currentCard = nextCard;
    }
  }

  restart() {
    var savedCards = this.cardService.getSavedCards();
    if (savedCards && savedCards.length > 0) {
      this.currentCard = savedCards[0];
    }
    else {
      this.currentCard = {
        id: 1,
        story: "A long time ago in a galaxy far, far away, Jar Jar Binks had a fungal infection. The history of poisoning in the future: lessons from Star Trek. Parachute use to prevent death and major trauma related to gravitational challenge...",
        header: "Introduction",
        title: "Let's get you into the story!",
        answers: [
          {
            decision: "Common... I don't have time for this...",
            cardId: "Let's get you into the story!",
            selected: false
          },
          {
            decision: "I'm here to listen!",
            cardId: "Let's get you into the story!",
            selected: true
          }
        ]
      };

      this.cardService.saveCard(this.currentCard);
    }
  }

  selectAnswer(answer) {
    this.currentCard.answers.forEach(a => a.selected = false);
    answer.selected = true;
  }
}

