// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
    formData: {
        channel: '',
        users: [],
    },

    createUser: () => ({
        name: '',
        isOwner: false
    }),

    // 表單邏輯
    handleResetForm: (data = null) => set(state => {
        const channel = data ? data.channel : '';
        const users = data ? data.users : [];

        console.log(data);


        return {
            ...state,
            formData: {
                channel,
                users,
            }
        }
    }),
    handleAddUser: () => set((state) => {

        if (state.formData.users.length + 1 >= 6) {
            return { ...state }
        }

        return {
            ...state,
            formData: {
                ...state.formData,
                users: [...state.formData.users, state.createUser()],
            }
        }
    }),
    handleUpdateUserName: ({ index, name }) => set(state => {
        console.log(index, name);
        const updateUsers = [...state.formData.users];
        updateUsers[index].name = name;

        return {
            ...state,
            formData: {
                ...state.formData,
                users: updateUsers,
            }
        }

    }),
    handleUpdateChannel: (channel) => set(state => ({
        ...state,
        formData: {
            ...state.formData,
            channel,
        }
    })),
    handleSetOwner: (index) => set((state) => {
        // 把所有使用者的擁有權改成false
        const allUsersToFalse = state.formData.users.map(user => ({
            ...user,
            isOwner: false,
        }))

        // 取出需要更改的對象
        const userToUpdate = allUsersToFalse[index];
        const updateUser = {
            ...userToUpdate,
            isOwner: true
        };

        // 再將對象對應回去
        allUsersToFalse[index] = updateUser;

        return {
            ...state,
            formData: {
                ...state.formData,
                users: allUsersToFalse,
            }
        }
    }),
    handleDeleteOwner: (index) => set(state => {
        // 把玩家資訊取出來
        const users = state.formData.users;
        // 刪除指定的玩家
        users.splice(index, 1);

        return {
            ...state,
            formData: {
                ...state.formData,
                users
            }
        }
    }),
}));

export default useStore;