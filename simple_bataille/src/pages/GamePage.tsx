
import React, { useState, useEffect } from 'react';
import { Card } from '../types/deck';
import CardComponent from '../components/Card';
import deckOfCardsAPI from '../services/deckOfCardService';

const GamePage: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerDeck, setPlayerDeck] = useState<Card[]>([]);
  const [computerDeck, setComputerDeck] = useState<Card[]>([]);
  const [playerCard, setPlayerCard] = useState<Card | null>(null);
  const [computerCard, setComputerCard] = useState<Card | null>(null);
  const [gameResult, setGameResult] = useState<string>('');
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const { cards } = await deckOfCardsAPI.getDeck();
        setDeck(cards);
        setPlayerDeck(cards.slice(0, 26));
        setComputerDeck(cards.slice(26, 52));
      } catch (error) {
        console.error('Erreur lors de la récupération du deck:', error);
      }
    };

    fetchDeck();
  }, []);

  const drawCards = () => {
    if (playerDeck.length > 0 && computerDeck.length > 0) {
      const playerDrawn = playerDeck[0];
      const computerDrawn = computerDeck[0];

      setPlayerDeck(playerDeck.slice(1));
      setComputerDeck(computerDeck.slice(1));

      setPlayerCard(playerDrawn);
      setComputerCard(computerDrawn);

      setTurns(turns + 1);

      if (playerDrawn.rank > computerDrawn.rank) {
        setGameResult('Vous avez gagné ce tour !');
        setPlayerDeck((prevDeck) => [...prevDeck, playerDrawn, computerDrawn]);
      } else if (playerDrawn.rank < computerDrawn.rank) {
        setGameResult('L\'ordinateur a gagné ce tour.');
        setComputerDeck((prevDeck) => [...prevDeck, playerDrawn, computerDrawn]);
      } else {
        setGameResult('Égalité !');
      }
    } else {
      setGameResult('Le jeu est terminé!');
    }
  };

  return (
    <div className="game-page bg-green-900 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-white mb-6">Simple Bataille</h1>
      <div className="controls text-center mb-6">
        {playerDeck.length > 0 && computerDeck.length > 0 ? (
          <button
            onClick={drawCards}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-800 transition"
          >
            Tirer une carte
          </button>
        ) : (
          <p className="text-white">Le jeu est terminé !</p>
        )}
        <p className="game-result text-white mt-4">{gameResult}</p>
        <p className="turns text-white">Tour: {turns}</p>
      </div>

      <div className="cards-display flex justify-between w-full px-16 relative">
      
        <div className="player-deck flex flex-col items-center relative">
          <h2 className="text-white text-xl mb-4">Paquet Joueur</h2>
          {playerDeck.map((_, index) => (
            <div
              key={index}
              className="absolute"
              style={{ top: `${index * 5}px` }}
            >
              <CardComponent hidden={true} />
            </div>
          ))}
        </div>

       
        <div className="card-container text-center">
          {playerCard && <CardComponent image={playerCard.image} />}
          {playerCard && <p className="mt-2 text-white font-bold">Joueur</p>}
        </div>

        
        <div className="card-container text-center">
          {computerCard && <CardComponent image={computerCard.image} />}
          {computerCard && <p className="mt-2 text-white font-bold">Ordinateur</p>}
        </div>

        <div className="computer-deck flex flex-col items-center relative">
          <h2 className="text-white text-xl mb-4">Paquet Ordinateur</h2>
          {computerDeck.map((_, index) => (
            <div
              key={index}
              className="absolute"
              style={{ top: `${index * 5}px` }}
            >
              <CardComponent hidden={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
