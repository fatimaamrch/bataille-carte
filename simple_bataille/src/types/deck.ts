export interface Card {
    code: string;
    image: string;
    images: {
      svg: string;
      png: string;
    };
    value: string;
    suit: string;
  }
  
  export interface Deck {
    deck_id: string;
    remaining: number;
    cards: Card[];
  }
  