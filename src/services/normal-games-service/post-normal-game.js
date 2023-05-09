import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';

const postNormalGame = (title, pOne, pTwo, legs, gameType) => {
    const game = {
        title: title,
        gameLegs: Number(legs),
        gameType: Number(gameType),
        turn: 1,
        startingTurn: 1,
        players: {
            playerOne: {
                name: pOne.toUpperCase(),
                totalAverage: 0,
                average: 0,
                legs: 0,
                score: 501,
                turns: [],
                allTurns: [],
                checkouts: [],
                highestScore: 0
            },
            playerTwo: {
                name: pTwo.toUpperCase(),
                totalAverage: 0,
                average: 0,
                legs: 0,
                score: 501,
                turns: [],
                allTurns: [],
                checkouts: [],
                highestScore: 0
            }
        }
    };
    return setDoc(doc(db, 'normal-game', game.title), game);
    // db.collection("accounts").doc(account.userId).add({account})
};

export default postNormalGame;
