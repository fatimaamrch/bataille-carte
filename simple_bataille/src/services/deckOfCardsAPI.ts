import axios from 'axios';
import { Deck } from '../types/deck';

class DeckOfCardsService {
  private deckId: string | null = null;

   // L'API utilisée pour créer et tirer des cartes provient de https://deckofcardsapi.com/
  // Cette API permet de créer un deck, mélanger les cartes, et tirer des cartes du deck.

  async createDeck() {
    try {
      const { data } = await axios.get<Deck>(
        'https://deckofcardsapi.com/api/deck/new/draw/?count=52'
      );
      this.deckId = data.deck_id;
      return data.cards;  
    } catch (error) {
      console.error('Error creating deck and drawing cards', error);
      throw error;
    }
  }

 
  async drawCard() {
    if (!this.deckId) {
      throw new Error('Deck not created yet');
    }
    try {
      const { data } = await axios.get<Deck>(
        `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`
      );
      return data.cards[0];
    } catch (error) {
      console.error('Error drawing card', error);
      throw error;
    }
  }
}

export default new DeckOfCardsService();
