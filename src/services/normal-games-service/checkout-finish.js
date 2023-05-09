import PLAYERS from '../../store/players';
import { calculateAverageOfArray, sumArray } from '../../helpers/helpers';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';

const updateCheckout = (game, gameTitle, player, newTurnsArr) => {
    if (player === PLAYERS.ONE) {
        const average = calculateAverageOfArray(newTurnsArr);
        const totalAverage = calculateAverageOfArray(newTurnsArr);
        const newScore = 501 - sumArray(newTurnsArr);
        const updatedGame = {
            title: game.title,
            gameLegs: game.gameLegs,
            gameType: game.gameType,
            turn: game.turn,
            startingTurn: game.startingTurn,
            players: {
                playerOne: {
                    name: game.players.playerOne.name,
                    totalAverage: game.players.playerOne.totalAverage,
                    average: average,
                    legs: game.players.playerOne.legs,
                    score: newScore,
                    turns: [...newTurnsArr],
                    allTurns: [...game.players.playerOne.turns, score]
                },
                playerTwo: {
                    name: game.players.playerTwo.name,
                    totalAverage: game.players.playerTwo.totalAverage,
                    average: game.players.playerTwo.average,
                    legs: game.players.playerTwo.legs,
                    score: game.players.playerTwo.score,
                    turns: game.players.playerTwo.turns,
                    allTurns: game.players.playerTwo.allTurns
                }
            }
        };
        return setDoc(doc(db, 'normal-game', gameTitle), updatedGame);
    } else {
        const average = calculateAverageOfArray(newTurnsArr);
        const newScore = 501 - sumArray(newTurnsArr);
        const updatedGame = {
            title: game.title,
            gameLegs: game.gameLegs,
            gameType: game.gameType,
            turn: game.turn,
            startingTurn: game.startingTurn,
            players: {
                playerOne: {
                    name: game.players.playerOne.name,
                    totalAverage: game.players.playerOne.totalAverage,
                    average: game.players.playerOne.average,
                    legs: game.players.playerOne.legs,
                    score: game.players.playerOne.score,
                    turns: game.players.playerOne.turns,
                    allTurns: game.players.playerOne.allTurns
                },
                playerTwo: {
                    name: game.players.playerTwo.name,
                    totalAverage: game.players.playerTwo.totalAverage,
                    average: average,
                    legs: game.players.playerTwo.legs,
                    score: newScore,
                    turns: [...newTurnsArr],
                    allTurns: game.players.playerTwo.allTurns
                }
            }
        };
        return setDoc(doc(db, 'normal-game', gameTitle), updatedGame);
    }
};

export default updateCheckout;
