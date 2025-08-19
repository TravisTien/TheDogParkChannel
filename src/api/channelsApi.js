import { db } from '../firebase';
import { doc, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export const getChannels = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'channels'));
        const channels = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // console.log('取得所有頻道資料', channels);

        return channels;
    } catch (e) {
        console.error('取得文件時出錯', e);
        return [];
    }
};

export const getChannel = async (id) => {
    try {
        const channelRef = doc(db, 'channels', id);
        const docSnap = await getDoc(channelRef);

        if (docSnap.exists()) {
            const channelData = {
                id: docSnap.id,
                ...docSnap.data(),
            }
            console.log('單一頻道資料', channelData);
            return channelData;
        }
    } catch (error) {
        console.error('拿取單一資料發生錯誤', error)
    }
};

export const addChannels = async (channelData) => {
    try {
        const docRef = await addDoc(collection(db, 'channels'), channelData);
        console.log('頻道新增成功，ID:', docRef.channel);
        return docRef.id;
    } catch (error) {
        console.error('新增頻道出現錯誤', error);
        return null;
    }
};

export const updateChannel = async (id, updateFiedls) => {
    try {
        const channelRef = doc(db, 'channels', id);
        await updateDoc(channelRef, updateFiedls);
        console.log('文件更新成功')
    } catch (error) {
        console.erroe('文件更新失敗', error)

    }
};

export const deleteChannel = async (id) => {
    try {
        const docRef = doc(db, 'channels', id);
        await deleteDoc(docRef);
        console.log('刪除頻道成功');
    } catch (error) {
        console.error('刪除頻道出現伺服器錯誤', error)
    }
};