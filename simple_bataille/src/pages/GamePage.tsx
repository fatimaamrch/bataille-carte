import React, { useState, useEffect } from 'react';
import { Card } from '../types/DeckTypes';
import CardComponent from '../components/CardComponents';
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

  const chooseCard = (card: Card) => {
    setPlayerCard(card);

    const computerDrawn = computerDeck[0];
    setComputerCard(computerDrawn);

    const updatedPlayerDeck = playerDeck.filter((c) => c !== card);
    const updatedComputerDeck = computerDeck.slice(1);

    setPlayerDeck(updatedPlayerDeck);
    setComputerDeck(updatedComputerDeck);

    if (card.rank > computerDrawn.rank) {
      setGameResult('Vous avez gagné ce tour !');
      setPlayerDeck((prevDeck) => [...prevDeck, card, computerDrawn]);
    } else if (card.rank < computerDrawn.rank) {
      setGameResult('L\'ordinateur a gagné ce tour.');
      setComputerDeck((prevDeck) => [...prevDeck, card, computerDrawn]);
    } else {
      setGameResult('Égalité !');
    }

    setTurns(turns + 1);
  };

  return (
    <div className="game-page bg-green-900 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-white mb-6">Simple Bataille</h1>
      <div className="controls text-center mb-6">
        {playerDeck.length > 0 && computerDeck.length > 0 ? (
          <p className="text-white mb-4">Choisis une carte pour jouer :</p>
        ) : (
          <p className="text-white">Le jeu est terminé !</p>
        )}

        <div className="player-cards mb-4 flex justify-center space-x-4">
          {playerDeck.slice(0, 5).map((card) => (
            <div key={card.code} onClick={() => chooseCard(card)}>
              <CardComponent image={card.image} hidden={false} />
            </div>
          ))}
        </div>

        <p className="game-result text-white mt-4">{gameResult}</p>
        <p className="turns text-white">Tour: {turns}</p>
      </div>

      <div className="cards-display flex justify-between w-full px-16 relative">
        <div className="player-deck flex flex-col items-center relative">
          <h2 className="text-white text-xl mb-4">Paquet Joueur</h2>
          {playerDeck.slice(0, 5).map((card, index) => (
            <div key={index} className="absolute" style={{ top: `${index * 5}px` }}>
              <CardComponent image={card.image} hidden={false} />
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
            <div key={index} className="absolute" style={{ top: `${index * 5}px` }}>
              <CardComponent hidden={true} />
            </div>
          ))}
        </div>
      </div>

      
      <div className="card-counts absolute bottom-0 w-full bg-gradient-to-t from-gray-800 via-gray-900 to-transparent py-6">
        <div className="flex justify-around items-center">
          <div className="text-white font-semibold text-xl">
            Cartes restantes Joueur : {playerDeck.length}
          </div>
          <div className="text-white font-semibold text-xl">
            Cartes restantes Ordinateur : {computerDeck.length}
          </div>
        </div>
        <div className="text-center text-white mt-4 text-sm font-light">
          <p>Bon jeu et bonne chance !</p>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
