import { db } from '../../firebase/config';
import { deleteDoc, doc } from '@firebase/firestore';

const deleteGame = async (title) => {
    return await deleteDoc(doc(db, 'normal-game', title));
};

export default deleteGame;
