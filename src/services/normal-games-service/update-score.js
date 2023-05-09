import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';
import { calculateAverage, sumArray } from '../../helpers/helpers';

const updateScore = (game, player, score) => {
    if (player === 'playerOne') {
        const average = calculateAverage(game.players.playerOne.turns, score);
        const totalAverage = calculateAverage(game.players.playerOne.allTurns, score);
        if (score > game.players.playerOne.score) {
            return updateOne(game, 0, average, totalAverage);
        }
        return updateOne(game, score, average, totalAverage);
    } else {
        const average = calculateAverage(game.players.playerTwo.turns, score);
        const totalAverage = calculateAverage(game.players.playerTwo.allTurns, score);
        if (score > game.players.playerTwo.score) {
            return updateTwo(game, score, average, totalAverage);
        }
        return updateTwo(game, score, average, totalAverage);
    }
};

const updateOne = (game, score, average, totalAverage) => {
    let newTurns = [...game.players.playerOne.turns, score];
    let newScore = 501 - sumArray(newTurns),
        updatedGame = {
            title: game.title,
            gameLegs: game.gameLegs,
            gameType: game.gameType,
            turn: 2,
            startingTurn: game.startingTurn,
            players: {
                playerOne: {
                    name: game.players.playerOne.name,
                    totalAverage: totalAverage,
                    average: average,
                    legs: game.players.playerOne.legs,
                    score: newScore,
                    turns: [...game.players.playerOne.turns, score],
                    allTurns: [...game.players.playerOne.allTurns, score],
                    checkouts: game.players.playerOne.checkouts,
                    highestScore: Math.max(...newTurns)
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
                    highestScore: Math.max(...game.players.playerTwo.turns)
                }
            }
        };
    return setDoc(doc(db, 'normal-game', game.title), updatedGame);
};
const updateTwo = (game, score, average, totalAverage) => {
    let newTurns = [...game.players.playerTwo.turns, score];
    let newScore = 501 - sumArray(newTurns),
        updatedGame = {
            title: game.title,
            gameLegs: game.gameLegs,
            gameType: game.gameType,
            turn: 1,
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
                    highestScore: Math.max(...game.players.playerOne.turns)
                },
                playerTwo: {
                    name: game.players.playerTwo.name,
                    totalAverage: totalAverage,
                    average: average,
                    legs: game.players.playerTwo.legs,
                    score: newScore,
                    turns: [...game.players.playerTwo.turns, score],
                    allTurns: [...game.players.playerTwo.allTurns, score],
                    checkouts: game.players.playerTwo.checkouts,
                    highestScore: Math.max(...newTurns)
                }
            }
        };
    return setDoc(doc(db, 'normal-game', game.title), updatedGame);
};
export default updateScore;
