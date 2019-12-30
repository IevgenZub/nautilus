export class Player {
  id: number;
  name: string = '';
  state: string[] = [];
}

export class Story {
  id: number;
  name: string;
  isActive: boolean;
  entryCardId: string;
  cards: Card[];
}

export class Card {
  id: number;
  header: string = '';
  title: string = '';
  description: string = '';
  answers: Answer[] = [];
}

export class Answer {
  decision: string = '';
  cardId: string = '';
  selected: boolean = false;
}
