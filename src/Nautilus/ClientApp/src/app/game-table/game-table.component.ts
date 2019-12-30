import { Component } from '@angular/core';
import { Player, Card, Story } from '../story';
import { faArrowRight, faUndo } from '@fortawesome/free-solid-svg-icons';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent {
  faArrowRight = faArrowRight;
  faUndo = faUndo;
  player: Player = new Player();
  story: Story;
  currentCard: Card;

  constructor(private storyService: StoryService) {
    this.restart();
  }

  nextCard() {
    var answer = this.currentCard.answers.filter(a => a.selected == true)[0];
    var nextCard = this.story.cards.filter(c => c.title == answer.cardId)[0];
    if (nextCard) {
      this.currentCard = nextCard;
    }
  }

  restart() {
    this.story = this.storyService.getStories()[0];
    if (this.story) {
      this.currentCard = this.story.cards[0];
    }
    else {
      this.story = <Story>{
        name: "Default",
        entryCardId: "Let's get you into the story!",
        cards: [{
          header: "Introduction",
          title: "Let's get you into the story!",
          description: "A long time ago in a galaxy far, far away, Jar Jar Binks had a fungal infection. The history of poisoning in the future: lessons from Star Trek. Parachute use to prevent death and major trauma related to gravitational challenge...",
          answers: [{
            decision: "Common... I don't have time for this...",
            cardId: "Let's get you into the story!",
            selected: false
          },
          {
            decision: "I'm here to listen!",
            cardId: "Let's get you into the story!",
            selected: true
          }]
        }]
      };

      this.currentCard = this.story.cards.filter(c => c.title == this.story.entryCardId)[0]; 
      this.storyService.saveStory(this.story);
      this.storyService.saveStory(<Story>{
        name: "Another default",
        entryCardId: "Another Let's get you into the story!",
        cards: [{
          header: "Another Introduction",
          title: "Another Let's get you into the story!",
          description: "Another A long time ago in a galaxy far, far away, Jar Jar Binks had a fungal infection. The history of poisoning in the future: lessons from Star Trek. Parachute use to prevent death and major trauma related to gravitational challenge...",
          answers: [{
            decision: "Another Common... I don't have time for this...",
            cardId: "Another Let's get you into the story!",
            selected: false
          },
          {
            decision: "Another I'm here to listen!",
            cardId: "Another Let's get you into the story!",
            selected: true
          }]
        }]
      });
    }
  }

  selectAnswer(answer) {
    this.currentCard.answers.forEach(a => a.selected = false);
    answer.selected = true;
  }
}

