import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    users: [],
    loggedUser: {}
  }),
  actions: {
    login(mail, pass) {
      // Check if user exists in users array
      const user = this.users.find(({ email, password }) => email === mail && password === pass)
      const correctEmail = this.users.find(({ email }) => email === mail)
      if (user) {
        this.isAuthenticated = true
        this.loggedUser = user
      } else if (!user && correctEmail) {
        throw new Error('Incorrect password, please try again.')
      } else {
        throw new Error('User not exist, please sign up.')
      }
    },
    logout() {
      this.isAuthenticated = false
    },
    addUser(user) {
      if (this.users.some((u) => u.email === user.email)) {
        throw new Error('User already registered , please ')
      }
      this.users.push(user)
    },
    editUser(updatedUser) {
      this.users.map((user) => {
        if (this.loggedUser.email === user.email) {
          user.email = updatedUser.email
          user.username = updatedUser.username
        }
        return user
      })
    }
  }
})
