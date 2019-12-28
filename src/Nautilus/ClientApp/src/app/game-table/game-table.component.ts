import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent {
  public player: Player = new Player();
  public currentCard: Card = {
    story: "A long time ago in a galaxy far, far away, Jar Jar Binks had a fungal infection. The history of poisoning in the future: lessons from Star Trek. Parachute use to prevent death and major trauma related to gravitational challenge...",
    header: "Introduction",
    title: "Let's get you into the story!",
    answers: [
      {
        text: "Common... I don't have time for this...",
        policies: [
          {
            condition: "Status=OK",
            card: { header:"Introduction", title: "You the boss", story: "Okay okay...",  answers: null }
          }],
        updates: ["Status=OK"],
        selected: true
      },
      {
        text: "Tell me more about it!",
        policies: [
          {
            condition: "Status=OK",
            card: { header: "Introduction", title: "Wait", story: "Are you sure you we have time for this?", answers: null }
          }],
        updates: ["Status=OK"],
        selected: false
      }
    ]
  };

  nextCard() {
    var answer = this.currentCard.answers.filter(a => a.selected == true)[0];
    this.player.state = this.player.state.concat(answer.updates);
    answer.policies.forEach(p => {
      if (this.player.state.includes(p.condition)) {
        this.currentCard = p.card;
        return;
      }
    })
  }

  selectAnswer(answer) {
    this.currentCard.answers.forEach(a => a.selected = false);
    answer.selected = true;
  }
}

class Player {
  name: string;
  state: string[] = [];
}

class Policy {
  condition: string;
  card: Card;
}

class Answer {
  text: string;
  updates: string[];
  policies: Policy[];
  selected: boolean;
}

class Card {
  header: string;
  title: string;
  story: string;
  answers: Answer[];
}


