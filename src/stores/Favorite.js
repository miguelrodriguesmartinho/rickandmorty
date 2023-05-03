import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('heroStoreId', {
  state: () => ({
    favorites: []
  }),

  actions: {
    addRepo(repo) {
      this.favorites.push(repo)
    },
    removeRepo(repo) {
      this.favorites = this.favorites.filter((obj) => obj.id !== repo.id)
    }
  }
})
