import PLAYERS from '../../store/players';
import { calculateAverage } from '../../helpers/helpers';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';

const updateLegs = (game, player, score) => {
    if (player === PLAYERS.ONE) {
        const highestScore = Math.max(game.players.playerOne.turns.push(score));
        const totalAverage = calculateAverage(game.players.playerOne.allTurns, score);
        const updatedGame = {
            title: game.title,
            gameLegs: game.gameLegs,
            gameType: game.gameType,
            turn: game.startingTurn === 1 ? 2 : 1,
            startingTurn: game.startingTurn === 1 ? 2 : 1,
            players: {
                playerOne: {
                    name: game.players.playerOne.name,
                    totalAverage: totalAverage,
                    average: 0,
                    legs: game.players.playerOne.legs + 1,
                    score: 501,
                    turns: [],
                    allTurns: [...game.players.playerOne.allTurns, score],
                    highestScore: 0,
                    checkouts: []
                },
                playerTwo: {
                    name: game.players.playerTwo.name,
                    totalAverage: game.players.playerTwo.totalAverage,
                    average: 0,
                    legs: game.players.playerTwo.legs,
                    score: 501,
                    turns: [],
                    allTurns: game.players.playerTwo.allTurns,
                    checkouts: [],
                    highestScore: 0
                }
            }
        };
        return setDoc(doc(db, 'normal-game', game.title), updatedGame);
    } else {
        const highestScore = Math.max(game.players.playerTwo.turns.push(score));
        let allTurns = [...game.players.playerTwo.allTurns, score];
        const totalAverage = calculateAverage(game.players.playerTwo.allTurns, score);
        const updatedGame = {
            title: game.title,
            gameLegs: game.gameLegs,
            gameType: game.gameType,
            turn: game.startingTurn === 1 ? 2 : 1,
            startingTurn: game.startingTurn === 1 ? 2 : 1,
            players: {
                playerOne: {
                    name: game.players.playerOne.name,
                    totalAverage: game.players.playerOne.totalAverage,
                    average: 0,
                    legs: game.players.playerOne.legs,
                    score: 501,
                    turns: [],
                    allTurns: game.players.playerOne.allTurns,
                    checkouts: [],
                    highestScore: 0
                },
                playerTwo: {
                    name: game.players.playerTwo.name,
                    totalAverage: totalAverage,
                    average: 0,
                    legs: game.players.playerTwo.legs + 1,
                    score: 501,
                    turns: [],
                    allTurns: [...game.players.playerTwo.allTurns, score],
                    checkouts: [],
                    highestScore: 0
                }
            }
        };
        return setDoc(doc(db, 'normal-game', game.title), updatedGame);
    }
};
export default updateLegs;
