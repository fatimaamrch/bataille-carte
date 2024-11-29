import { Card } from '../types/deck';

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
  }
  return shuffled;
};

export const compareCards = (playerCard: Card, computerCard: Card): string => {
  const cardValues: { [key: string]: number } = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'JACK': 11, 'QUEEN': 12, 'KING': 13, 'ACE': 14,
  };

  const playerValue = cardValues[playerCard.value];
  const computerValue = cardValues[computerCard.value];

  if (playerValue > computerValue) {
    return 'Player wins this round';
  } else if (computerValue > playerValue) {
    return 'Computer wins this round';
  } else {
    return 'It\'s a tie!';
  }
};
