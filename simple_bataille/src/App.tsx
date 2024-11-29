import React, { useState, useEffect } from 'react';
import DeckOfCardsService from './services/deckOfCardsAPI';
import { Card as CardType } from './types/deck';  // Importer le type

const App: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [playerCard, setPlayerCard] = useState<CardType | null>(null);
  const [computerCard, setComputerCard] = useState<CardType | null>(null);
  const [winner, setWinner] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [scores, setScores] = useState({ player: 26, computer: 26 }); // Chaque joueur commence avec 26 cartes

  // Initialiser le jeu et tirer les 52 cartes
  useEffect(() => {
    const initializeGame = async () => {
      try {
        const initialCards = await DeckOfCardsService.createDeck();
        setCards(initialCards);  // Stocker les 52 cartes tirées
      } catch (error) {
        console.error('Error initializing game', error);
      }
    };
    initializeGame();
  }, []);

  // Fonction pour jouer un round
  const playRound = () => {
    if (cards.length >= 2 && !gameOver) {
      const [playerCard, computerCard] = cards.splice(0, 2);
      setPlayerCard(playerCard);
      setComputerCard(computerCard);

      // Comparer les cartes et déterminer le gagnant
      const roundWinner = compareCards(playerCard, computerCard);
      setWinner(roundWinner);

      // Mettre à jour les scores
      if (roundWinner === 'Joueur gagne') {
        setScores((prev) => ({ ...prev, player: prev.player + 1 }));
      } else if (roundWinner === 'Ordinateur gagne') {
        setScores((prev) => ({ ...prev, computer: prev.computer + 1 }));
      }

      // Vérifier la fin du jeu
      if (scores.player === 0 || scores.computer === 0) {
        setGameOver(true);
      }
    }
  };

  // Comparer les cartes
  const compareCards = (playerCard: CardType, computerCard: CardType) => {
    const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const playerIndex = cardValues.indexOf(playerCard.value);
    const computerIndex = cardValues.indexOf(computerCard.value);

    if (playerIndex > computerIndex) {
      return 'Joueur gagne';
    } else if (playerIndex < computerIndex) {
      return 'Ordinateur gagne';
    } else {
      return 'Égalité';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Simple Bataille</h1>

      <div className="flex space-x-10 mb-6">
        {playerCard && (
          <div>
            <h2 className="text-xl mb-2">Joueur</h2>
            <img src={playerCard.image} alt="Player Card" />
            <p>{playerCard.value} of {playerCard.suit}</p>
          </div>
        )}
        {computerCard && (
          <div>
            <h2 className="text-xl mb-2">Ordinateur</h2>
            <img src={computerCard.image} alt="Computer Card" />
            <p>{computerCard.value} of {computerCard.suit}</p>
          </div>
        )}
      </div>

      <button onClick={playRound} className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-6">
        Tirer les cartes
      </button>

      {winner && <p className="mt-4 text-xl">{winner}</p>}

      {gameOver && <p className="mt-6 text-2xl font-bold">Le jeu est terminé !</p>}

      <div className="mt-4 text-lg">
        <p>Cartes restantes - Joueur: {scores.player}, Ordinateur: {scores.computer}</p>
      </div>
    </div>
  );
};

export default App;
