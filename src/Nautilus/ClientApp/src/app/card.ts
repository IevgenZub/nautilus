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

export class Policy {
  condition: string = '';
  cardId: number;
}

export class Answer {
  text: string = '';
  updates: string[] = [];
  policies: Policy[] = [];
  selected: boolean = false;
}
