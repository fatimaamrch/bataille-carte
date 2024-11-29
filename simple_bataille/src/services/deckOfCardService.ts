
import axios from 'axios';
import { Deck } from '../types/DeckTypes';


const getDeck = async (): Promise<Deck> => {
  try {
    const { data } = await axios.get<Deck>(
      'https://deckofcardsapi.com/api/deck/new/draw/?count=52'
    );
 
    const cardsWithRank = data.cards.map((card) => ({
      ...card,
      rank: getCardRank(card.value),
    }));
    return { cards: cardsWithRank };
  } catch (error) {
    console.error('Erreur lors de la récupération du paquet de cartes', error);
    throw new Error('Erreur API');
  }
};

const getCardRank = (value: string): number => {
  switch (value) {
    case 'ACE':
      return 14;
    case 'KING':
      return 13;
    case 'QUEEN':
      return 12;
    case 'JACK':
      return 11;
    default:
      return parseInt(value, 10);  
  }
};

export default { getDeck };
