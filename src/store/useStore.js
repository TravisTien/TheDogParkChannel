// store.js
import { create } from 'zustand';
import { getChannels } from "../api/channelsApi";

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
    handleResetForm: (data = null) => {
        const channel = data ? data.channel : '';
        const users = data ? data.users : [];

        set({
            formData: {
                channel,
                users,
            }
        })
    },
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
        const updateUsers = [...state.formData.users];
        updateUsers[index].name = name;

        return {
            formData: {
                ...state.formData,
                users: updateUsers,
            }
        }
    }),
    handleUpdateChannel: (channel) => set(state => ({
        formData: {
            ...state.formData,
            channel,
        }
    })),
    handleSetOwner: (index) => set((state) => {
        // 把所有使用者的擁有權改成false
        const updateUsers = state.formData.users.map((user, i) => ({
            ...user,
            isOwner: i === index ? true : false,
        }))


        return {
            formData: {
                ...state.formData,
                users: updateUsers,
            }
        }
    }),
    handleDeleteOwner: (index) => set(state => {
        // 把玩家資訊取出來
        const users = state.formData.users;
        // 刪除指定的玩家
        users.splice(index, 1);

        return {
            formData: {
                ...state.formData,
                users
            }
        }
    }),

    // API狀態
    channels: [],
    isLoading: false,
    fetchChannel: async () => {
        set({ loading: true });
        const channelsData = await getChannels();
        set({
            channels: channelsData,
            isLoading: false
        });
    },
}));

export default useStore;