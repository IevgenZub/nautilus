import { Component} from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  cards: Card[];

  constructor(private cardService: CardService) {
    this.cards = this.cardService.getSavedCards();
  }

}
