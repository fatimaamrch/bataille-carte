// types/deck.ts
export interface Card {
    code: string;
    image: string;
    value: string;
    suit: string;
    rank: number;  // Rang de la carte pour déterminer la force (ex: As = 14, Roi = 13, etc.)
  }
  
  export interface Deck {
    cards: Card[];
  }
  