export class Card {
  header: string = '';
  title: string = '';
  story: string = '';
  answers: Answer[] = [];
}

export class Player {
  name: string = '';
  state: string[] = [];
}

export class Policy {
  condition: string = '';
  cardTitle: string = '';
}

export class Answer {
  text: string = '';
  updates: string[] = [];
  policies: Policy[] = [];
  selected: boolean = false;
}
