import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';

const getOne = async (title) => {
    const docRef = doc(db, 'normal-game', title);
    const result = await getDoc(docRef);
    return result.data();
};

export default getOne;
