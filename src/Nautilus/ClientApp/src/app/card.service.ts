import { Injectable, Inject } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Card } from './card';
import { SAVED_CARDS_KEY } from './constants';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  readonly SAVED_CARDS_KEY = SAVED_CARDS_KEY;
  
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    if (!this.storage.has(this.SAVED_CARDS_KEY)) {
      this.storage.set(this.SAVED_CARDS_KEY, []);
    } 
  }

  getSavedCards() : Card[] {
    return this.storage.get(this.SAVED_CARDS_KEY);
  }

  saveCard(card: Card) {
    var savedCards = <Card[]> this.storage.get(this.SAVED_CARDS_KEY);
    var existing = savedCards.filter(c => c.id == card.id)[0];

    if (existing) {
      existing.header = card.header;
      existing.title = card.title;
      existing.story = card.story;
      existing.answers = card.answers;
    }
    else {
      card.id = savedCards.length + 1;
      savedCards.push(card);
    }

    this.storage.set(this.SAVED_CARDS_KEY, savedCards);
  }

  deleteCard(title: string) {
    var savedCards = this.storage.get(this.SAVED_CARDS_KEY);
    savedCards =  savedCards.filter(sa => sa.title != title);
    this.storage.set(this.SAVED_CARDS_KEY, savedCards);
  }
}
