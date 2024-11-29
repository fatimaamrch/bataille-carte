
export interface Card {
    code: string;
    image: string;
    value: string;
    suit: string;
    rank: number;
  }
  
  export interface Deck {
    cards: Card[];
  }
  