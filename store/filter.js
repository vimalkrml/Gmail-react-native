import { create } from 'zustand'
import useStore from './store'

const useFilter = create((set) => ({
    searchText: '',


    setSearchText: (text) => {
        set({ searchText: text })
    },

    handleSearch: (text) => {
        set({ searchText: text })
    },

    clearSearch: () => set({ searchText: ''  }),
}))

useStore.getState().fetchMails()

export default useFilter