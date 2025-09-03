import { db } from '../firebase';
import { doc, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, where, query, serverTimestamp } from 'firebase/firestore';

// 取得當前狀態
const prefix = import.meta.env.VITE_CHANNELS_COLLECTION;
console.log('prefix', typeof (prefix));

export const getChannels = async (currentZone = null) => {
    // 拿取全部資料
    if (!currentZone) {
        try {
            const querySnapshot = await getDocs(collection(db, prefix));
            const channels = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // console.log('所有頻道資料:', channels);
            return channels;
        } catch (e) {
            console.error('取得所有頻道資料時出錯', e);
            return [];
        }
    }
    // 拿取當前區域的資料
    else if (currentZone) {
        // console.log('當前區域為',currentZone);

        // 集合參考
        const collectRef = collection(db, prefix);
        // 建立搜尋器
        const q = query(collectRef, where('zone', '==', currentZone));
        try {
            // 執行搜尋
            const querySnapshot = await getDocs(q);

            const channels = [];
            if (!querySnapshot.empty) {
                querySnapshot.forEach(doc => {
                    const data = {
                        ...doc.data(),
                        id: doc.id
                    }

                    channels.push(data)
                });
            }
            console.log(`取得${currentZone}頻道資料:`, channels);


            return channels;
        } catch (e) {
            console.error(`取得${currentZone}時出錯:`, e);
            return [];
        }
    }
};

export const getChannel = async (id) => {
    try {
        const channelRef = doc(db, prefix, id);
        const docSnap = await getDoc(channelRef);

        if (docSnap.exists()) {
            const channelData = {
                id: docSnap.id,
                ...docSnap.data(),
            }
            // console.log('單一頻道資料', channelData);
            return channelData;
        }
    } catch (error) {
        console.error('拿取單一資料發生錯誤', error)
    }
};

export const addChannels = async (channelData) => {
    try {
        const newData = { ...channelData };
        newData.updatedAt = serverTimestamp();

        const docRef = await addDoc(collection(db, prefix), newData);
        console.log('頻道新增成功，ID:', docRef.channel);
        return docRef.id;
    } catch (error) {
        console.error('新增頻道出現錯誤', error);
        return null;
    }
};

export const updateChannel = async (id, updateFiedls) => {
    try {
        // console.log(updateFiedls);

        const updateData = { ...updateFiedls };
        updateData.updatedAt = serverTimestamp();

        const channelRef = doc(db, prefix, id);
        await updateDoc(channelRef, updateData);
        console.log('文件更新成功')
    } catch (error) {
        console.error('文件更新失敗', error)
    }
};

export const deleteChannel = async (id) => {
    try {
        const docRef = doc(db, prefix, id);
        await deleteDoc(docRef);
        // console.log('刪除頻道成功');
    } catch (error) {
        console.error('刪除頻道出現伺服器錯誤', error)
    }
};

export const updateQueue = async (id, updateFiedls) => {
    try {
        const channelRef = doc(db, prefix, id);
        await updateDoc(channelRef, updateFiedls);
        // console.log('排隊列表更新成功')
    } catch (error) {
        // console.erroe('文件更新失敗', error)
    }
};