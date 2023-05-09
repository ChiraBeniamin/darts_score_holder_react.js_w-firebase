import PLAYERS from '../../store/players';
import { calculateAverageOfArray, sumArray } from '../../helpers/helpers';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';

const updateTurns = (oldValue, newValue, game, player, newTurnsArr) => {
    if (player === PLAYERS.ONE) {
        const newALLTurnsIndex = game.players.playerOne.allTurns.indexOf(oldValue);
        game.players.playerOne.allTurns[newALLTurnsIndex] = newValue;
        const average = calculateAverageOfArray(newTurnsArr);
        const totalAverage = calculateAverageOfArray(game.players.playerOne.allTurns);
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
                    totalAverage: totalAverage,
                    average: average,
                    legs: game.players.playerOne.legs,
                    score: newScore,
                    turns: [...newTurnsArr],
                    allTurns: game.players.playerOne.allTurns,
                    checkouts: game.players.playerOne.checkouts,
                    highestScore: Math.max(...newTurnsArr)
                },
                playerTwo: {
                    name: game.players.playerTwo.name,
                    totalAverage: game.players.playerTwo.totalAverage,
                    average: game.players.playerTwo.average,
                    legs: game.players.playerTwo.legs,
                    score: game.players.playerTwo.score,
                    turns: game.players.playerTwo.turns,
                    allTurns: game.players.playerTwo.allTurns,
                    checkouts: game.players.playerTwo.checkouts,
                    highestScore: game.players.playerTwo.highestScore
                }
            }
        };
        console.log('updatedGame-->', updatedGame);
        return setDoc(doc(db, 'normal-game', game.title), updatedGame);
    } else {
        const newALLTurnsIndex = game.players.playerTwo.allTurns.indexOf(oldValue);
        game.players.playerTwo.allTurns[newALLTurnsIndex] = newValue;
        const average = calculateAverageOfArray(newTurnsArr);
        const tAverage = calculateAverageOfArray(game.players.playerTwo.allTurns);
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
                    allTurns: game.players.playerOne.allTurns,
                    checkouts: game.players.playerOne.checkouts,
                    highestScore: game.players.playerOne.highestScore
                },
                playerTwo: {
                    name: game.players.playerTwo.name,
                    totalAverage: 30,
                    average: average,
                    legs: game.players.playerTwo.legs,
                    score: newScore,
                    turns: [...newTurnsArr],
                    allTurns: game.players.playerTwo.allTurns,
                    checkouts: game.players.playerTwo.checkouts,
                    highestScore: Math.max(...newTurnsArr)
                }
            }
        };
        console.log('updatedGame-->', updatedGame);
        return setDoc(doc(db, 'normal-game', game.title), updatedGame);
    }
};

export default updateTurns;
