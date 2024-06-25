import { create } from 'zustand'
import axios from 'axios'

const useStore = create((set) => ({
  mails: [],

  fetchMails: async () => {
    try {
        const response = await axios.get('http://192.168.43.196:3000/mails')
        set({ mails: response.data })
    } catch(error) {
        console.log('oh no', error)
    }
  },

  updateFlag : async(item) => {
    try {
        const { fetchMails } = useStore.getState()
        await axios.put('http://192.168.43.196:3000/mails/' + item.id, {
            ...item,
            flag: true, 
        })
        fetchMails()
    } catch(error) {
        console.log('oops', error)
    }
  },

  composeMail : async(item) => {
    // const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    try {
        const { fetchMails } = useStore.getState()
        await axios.post('http://192.168.43.196:3000/mails/', {
          ...item,
          time: new Date(),
          avatar: 'V',
          starred: false,
          flag: false, 
          send: true
        })
        fetchMails()
    } catch(error) {
        console.log('oops', error)
    }
  },

  starredMail : async(item) => {
    // const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    try {
        const { fetchMails } = useStore.getState()
        await axios.put('http://192.168.43.196:3000/mails/' + item.id, {
          ...item,
          starred: !item.starred,
        })
        fetchMails()
    } catch(error) {
        console.log('oops', error)
    }
  }
}))

useStore.getState().fetchMails()

export default useStore