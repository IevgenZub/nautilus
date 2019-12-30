export class Card {
  id: number;
  header: string = '';
  title: string = '';
  story: string = '';
  answers: Answer[] = [];
}

export class Player {
  id: number;
  name: string = '';
  state: string[] = [];
}

export class Answer {
  decision: string = '';
  cardId: string = '';
  selected: boolean = false;
}
